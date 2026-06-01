import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Pflanzia",
  description:
    "Frequently asked questions about Pflanzia — plant identification, accuracy, pricing, privacy, and technical support.",
};

const faqGroups = [
  {
    topic: "General",
    icon: "💬",
    items: [
      {
        q: "What is Pflanzia?",
        a: "Pflanzia is an AI-powered plant identification and care assistant. You upload a photo of any plant and receive its name, care instructions, toxicity info, and more within seconds.",
      },
      {
        q: "Do I need an account to use Pflanzia?",
        a: "You need an account to identify plants and save results. Browsing the public Explore gallery is available without signing in.",
      },
      {
        q: "What types of plants can Pflanzia identify?",
        a: "Pflanzia can identify a wide range of plants including houseplants, garden plants, wildflowers, trees, shrubs, succulents, and cacti. Results are most accurate for common species with well-documented visual features.",
      },
    ],
  },
  {
    topic: "Identification",
    icon: "🔍",
    items: [
      {
        q: "How accurate is the plant identification?",
        a: "Accuracy varies by species and photo quality. Pflanzia always returns a confidence level (High, Medium, or Low) alongside the result. High-confidence identifications are typically correct; low-confidence results should be verified.",
      },
      {
        q: "What makes a good plant photo?",
        a: "Take photos in good natural light with the leaf structure clearly visible. Include both the top and underside of leaves if possible. Avoid blurry or heavily shadowed images for best results.",
      },
      {
        q: "Can I add context to improve the result?",
        a: "Yes. There is an optional context field on the identify page where you can describe where you found the plant (e.g., 'Tropical greenhouse in Florida') to help the AI narrow down the result.",
      },
      {
        q: "What file formats are supported?",
        a: "Pflanzia accepts JPG, PNG, and WEBP images up to 10 MB in size.",
      },
    ],
  },
  {
    topic: "Pricing",
    icon: "💳",
    items: [
      {
        q: "Is Pflanzia free?",
        a: "Yes. The Free plan allows 10 plant identifications per month with full care instructions and toxicity alerts. The Pro plan ($9/month) removes limits and adds additional features.",
      },
      {
        q: "Can I cancel my Pro subscription at any time?",
        a: "Yes. Cancel anytime from your profile settings. Your plan remains active until the end of the current billing period.",
      },
      {
        q: "Is there a trial for Pro?",
        a: "We offer a 14-day money-back guarantee on the Pro plan. If you're not satisfied, contact us within 14 days for a full refund.",
      },
    ],
  },
  {
    topic: "Privacy",
    icon: "🔒",
    items: [
      {
        q: "What happens to the photos I upload?",
        a: "Photos are sent to Cloudflare AI for analysis and are not stored permanently on their servers. Pflanzia stores your results (plant data and a reference image) securely in our database tied to your account.",
      },
      {
        q: "Is my personal data shared with third parties?",
        a: "We use Cloudflare AI for image analysis and Supabase for authentication and data storage. We do not sell your data to any third parties. See our Privacy Policy for full details.",
      },
    ],
  },
  {
    topic: "Technical",
    icon: "🛠",
    items: [
      {
        q: "Which AI model powers the identification?",
        a: "Pflanzia uses the LLaVA 1.5 7B vision-language model running on Cloudflare Workers AI infrastructure.",
      },
      {
        q: "Does Pflanzia work on mobile?",
        a: "Yes. The web app is fully responsive and includes a native camera capture button on mobile devices so you can take photos directly from the app.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="text-white">
      {/* Hero */}
      <section className="border-b border-gray-800 px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-400 text-lg">
            Everything you need to know about Pflanzia.
          </p>
        </div>
      </section>

      {/* FAQ groups */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-14">
          {faqGroups.map((group) => (
            <div key={group.topic}>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl" aria-hidden="true">{group.icon}</span>
                <h2 className="text-xl font-bold text-white">{group.topic}</h2>
              </div>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none select-none hover:bg-gray-800/60 transition-colors">
                      <span className="text-white font-medium pr-4">{item.q}</span>
                      <span className="text-gray-500 shrink-0 group-open:rotate-180 transition-transform text-xl">⌄</span>
                    </summary>
                    <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-4">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-md">
          <h2 className="text-2xl font-bold text-white mb-3">Still have questions?</h2>
          <p className="text-gray-400 text-sm mb-6">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our team.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-2xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
