import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Payment Successful — Pflanzia",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) redirect("/pricing");

  // Verify the Stripe session is paid
  let customerEmail: string | null = null;
  let stripeCustomerId: string | null = null;
  let stripeSubscriptionId: string | null = null;

  try {
    const stripeSession = await stripe.checkout.sessions.retrieve(session_id);
    if (stripeSession.payment_status !== "paid") redirect("/pricing");
    customerEmail = stripeSession.customer_details?.email ?? null;
    stripeCustomerId = stripeSession.customer as string | null;
    stripeSubscriptionId = stripeSession.subscription as string | null;
  } catch {
    redirect("/pricing");
  }

  // If the user is already logged in, link the subscription and go to dashboard
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user && stripeCustomerId && stripeSubscriptionId) {
    const sub = await stripe.subscriptions.retrieve(stripeSubscriptionId);
    const priceId = sub.items.data[0].price.id;
    const billingPeriod =
      priceId === process.env.STRIPE_PRICE_ID_PRO_YEARLY ? "yearly" : "monthly";

    await supabase.from("subscriptions").upsert(
      {
        user_id: user.id,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscriptionId,
        plan: "pro",
        billing_period: billingPeriod,
        status: sub.status,
      },
      { onConflict: "user_id" }
    );

    await stripe.customers.update(stripeCustomerId, {
      metadata: { supabase_user_id: user.id },
    });

    redirect("/dashboard?upgraded=true");
  }

  // Guest: prompt them to create or sign in to their account
  const signUpHref = `/sign-up?session_id=${session_id}${customerEmail ? `&email=${encodeURIComponent(customerEmail)}` : ""}`;
  const signInHref = `/sign-in?session_id=${session_id}`;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/40 border border-green-700">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">Payment successful!</h1>
        <p className="text-gray-400 mb-2">
          Your Pro subscription is confirmed and ready to activate.
        </p>
        {customerEmail && (
          <p className="text-sm text-gray-500 mb-8">
            Receipt will be sent to <span className="text-gray-300">{customerEmail}</span>
          </p>
        )}

        <div className="rounded-2xl border border-green-800 bg-green-950/30 p-5 mb-8 text-left">
          <p className="text-green-400 font-semibold text-sm mb-2">What&apos;s included in Pro:</p>
          <ul className="space-y-1.5 text-sm text-gray-300">
            <li className="flex gap-2"><span className="text-green-400 shrink-0">✓</span> Unlimited plant identifications</li>
            <li className="flex gap-2"><span className="text-green-400 shrink-0">✓</span> Full identification history</li>
            <li className="flex gap-2"><span className="text-green-400 shrink-0">✓</span> Plant encyclopedia access</li>
            <li className="flex gap-2"><span className="text-green-400 shrink-0">✓</span> Priority AI processing &amp; support</li>
          </ul>
        </div>

        <p className="text-gray-400 text-sm mb-6">
          Create a free account to activate your Pro features — takes under a minute.
        </p>

        <div className="space-y-3">
          <Link
            href={signUpHref}
            className="block w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
          >
            Create account &amp; activate Pro
          </Link>
          <Link
            href={signInHref}
            className="block w-full rounded-xl border border-gray-700 py-3 text-sm font-medium text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
