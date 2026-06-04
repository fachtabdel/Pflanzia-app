import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { billingPeriod } = await request.json() as { billingPeriod: "monthly" | "yearly" };

    const priceId =
      billingPeriod === "yearly"
        ? process.env.STRIPE_PRICE_ID_PRO_YEARLY!
        : process.env.STRIPE_PRICE_ID_PRO_MONTHLY!;

    const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    if (user) {
      // Authenticated: look up or create Stripe customer tied to this user
      const { data: existingSub } = await supabase
        .from("subscriptions")
        .select("stripe_customer_id")
        .eq("user_id", user.id)
        .maybeSingle();

      let customerId: string | undefined = existingSub?.stripe_customer_id;

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: { supabase_user_id: user.id },
        });
        customerId = customer.id;
      }

      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${origin}/dashboard?upgraded=true`,
        cancel_url: `${origin}/pricing`,
        client_reference_id: user.id,
      });

      return NextResponse.json({ url: session.url });
    }

    // Guest checkout: Stripe automatically creates a customer for subscriptions
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    const message = err instanceof Error ? err.message : "Failed to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
