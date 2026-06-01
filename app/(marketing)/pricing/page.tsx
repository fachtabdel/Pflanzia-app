import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing — Pflanzia",
  description:
    "Simple, transparent pricing for Pflanzia. Start free and upgrade to Pro for unlimited plant identifications and advanced features.",
};

const plans = [
  {
    name: "Free",
    price: { monthly: "$0", yearly: "$0" },
    description: "Perfect for casual plant lovers.",
    cta: "Get Started Free",
    href: "/sign-up",
    highlighted: false,
    features: [
      "10 plant identifications / month",
      "Care instructions",
      "Toxicity alerts",
      "Identification history (last 30 days)",
      "Community explore access",
    ],
    missing: ["Unlimited identifications", "Plant encyclopedia", "Priority support"],
  },
  {
    name: "Pro",
    price: { monthly: "$9", yearly: "$7" },
    description: "For serious plant enthusiasts.",
    cta: "Start Pro Trial",
    href: "/sign-up?plan=pro",
    highlighted: true,
    features: [
      "Unlimited plant identifications",
      "Care instructions",
      "Toxicity alerts",
      "Full identification history",
      "Plant encyclopedia access",
      "Save unlimited plants",
      "Priority AI processing",
      "Priority support",
    ],
    missing: [],
  },
];

const tableFeatures = [
  { label: "Identifications / month", free: "10", pro: "Unlimited" },
  { label: "Care instructions", free: "✓", pro: "✓" },
  { label: "Toxicity alerts", free: "✓", pro: "✓" },
  { label: "History retention", free: "30 days", pro: "Forever" },
  { label: "Plant encyclopedia", free: "—", pro: "✓" },
  { label: "Save plants", free: "Up to 20", pro: "Unlimited" },
  { label: "Priority processing", free: "—", pro: "✓" },
  { label: "Priority support", free: "—", pro: "✓" },
];

const faqItems = [
  {
    q: "Can I change plans at any time?",
    a: "Yes — you can upgrade, downgrade, or cancel anytime. Changes take effect at the start of your next billing period.",
  },
  {
    q: "What happens if I hit the free plan limit?",
    a: "Your account is paused for identifications until the month resets. Your history and saved plants remain accessible.",
  },
  {
    q: "Is my payment information secure?",
    a: "Payments are processed securely via Stripe. Pflanzia never stores your card details.",
  },
];

export default function PricingPage() {
  return (
    <div className="text-white">
      {/* Hero */}
      <section className="border-b border-gray-800 px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Simple Pricing</h1>
          <p className="text-gray-400 text-lg">
            Start free. Upgrade when you need more.
          </p>
        </div>
      </section>

      {/* Plan cards */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 flex flex-col relative ${
                plan.highlighted
                  ? "border-green-700 bg-green-900/20"
                  : "border-gray-700 bg-gray-900"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute top-5 right-5 rounded-full bg-green-600 px-3 py-0.5 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <div className="mb-6">
                <p className="text-white font-bold text-2xl mb-1">{plan.name}</p>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <p className="text-4xl font-bold text-white">
                  {plan.price.monthly}
                  <span className="text-gray-500 text-base font-normal">/mo</span>
                </p>
                {plan.highlighted && (
                  <p className="text-green-400 text-xs mt-1">or {plan.price.yearly}/mo billed annually</p>
                )}
              </div>

              <Link
                href={plan.href}
                className={`w-full rounded-xl py-3 text-sm font-semibold text-center mb-8 transition-colors ${
                  plan.highlighted
                    ? "bg-green-600 text-white hover:bg-green-500"
                    : "border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-green-400 shrink-0 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600 line-through">
                    <span className="shrink-0 mt-0.5">—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Trust signals */}
      <div className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
        <span>✓ Cancel anytime</span>
        <span>✓ Secure payment via Stripe</span>
        <span>✓ 14-day money-back guarantee</span>
      </div>

      {/* Comparison table */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Feature comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900">
                  <th className="text-left px-6 py-4 text-gray-400 font-medium">Feature</th>
                  <th className="text-center px-6 py-4 text-white font-semibold">Free</th>
                  <th className="text-center px-6 py-4 text-green-400 font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody>
                {tableFeatures.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-gray-800 ${i % 2 === 0 ? "bg-gray-950" : "bg-gray-900/40"}`}
                  >
                    <td className="px-6 py-4 text-gray-400">{row.label}</td>
                    <td className="px-6 py-4 text-center text-gray-300">{row.free}</td>
                    <td className="px-6 py-4 text-center text-gray-300">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Common questions</h2>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <p className="text-white font-semibold mb-2">{item.q}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-gray-500 text-sm">
            More questions?{" "}
            <Link href="/faq" className="text-green-400 hover:text-green-300 underline underline-offset-4">
              Visit our full FAQ
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
