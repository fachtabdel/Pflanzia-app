import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode !== "subscription") break;

      const subscriptionId = session.subscription as string;
      const customerId = session.customer as string;
      const userId = session.client_reference_id;
      if (!userId) break;

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const priceId = subscription.items.data[0].price.id;
      const billingPeriod =
        priceId === process.env.STRIPE_PRICE_ID_PRO_YEARLY ? "yearly" : "monthly";
      const periodEndTs = subscription.billing_schedules[0]?.bill_until?.computed_timestamp;

      await supabase.from("subscriptions").upsert(
        {
          user_id: userId,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          plan: "pro",
          billing_period: billingPeriod,
          status: subscription.status,
          current_period_end: periodEndTs
            ? new Date(periodEndTs * 1000).toISOString()
            : null,
        },
        { onConflict: "user_id" }
      );
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const periodEndTs = subscription.billing_schedules[0]?.bill_until?.computed_timestamp;

      await supabase
        .from("subscriptions")
        .update({
          status: subscription.status,
          current_period_end: periodEndTs
            ? new Date(periodEndTs * 1000).toISOString()
            : null,
        })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      await supabase
        .from("subscriptions")
        .update({ status: "canceled", plan: "free" })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
