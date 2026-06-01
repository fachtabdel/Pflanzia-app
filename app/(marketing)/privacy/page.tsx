import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Pflanzia",
  description: "Pflanzia Privacy Policy — how we collect, use, and protect your data.",
};

const sections = [
  {
    id: "data-collected",
    title: "1. Data Collected",
    content: `When you create an account, we collect your email address and display name. When you use the plant identification feature, we process the images you upload. We also collect standard usage data such as page views and feature interactions to improve the service.`,
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Data",
    content: `Your data is used to provide and improve the Pflanzia service — including delivering plant identification results, storing your identification history, and personalizing your experience. We do not sell your personal data to third parties.`,
  },
  {
    id: "third-parties",
    title: "3. Third-Party Services",
    content: `Pflanzia uses the following third-party services:\n\n• Cloudflare Workers AI — processes plant images for identification. Images are sent to Cloudflare's infrastructure and are not stored permanently by Cloudflare after processing.\n\n• Supabase — provides user authentication and secure database storage for your account data, identification history, and saved plants.\n\nEach service operates under its own privacy policy and data processing terms.`,
  },
  {
    id: "cookies",
    title: "4. Cookies",
    content: `Pflanzia uses cookies to maintain your authentication session. We do not use tracking or advertising cookies. You can disable cookies in your browser settings, but this will prevent you from staying signed in.`,
  },
  {
    id: "user-rights",
    title: "5. Your Rights",
    content: `You have the right to access, correct, or delete the personal data we hold about you. You can delete your account and all associated data from the Profile page. For data access requests or other privacy inquiries, contact us at privacy@pflanzia.app.`,
  },
  {
    id: "data-security",
    title: "6. Data Security",
    content: `We use industry-standard encryption in transit (TLS/HTTPS) and at rest. Access to production systems is restricted to authorized personnel only. Despite these measures, no method of internet transmission is 100% secure.`,
  },
  {
    id: "contact",
    title: "7. Contact",
    content: `If you have questions about this privacy policy or how your data is handled, email us at privacy@pflanzia.app.`,
  },
];

const toc = sections.map((s) => ({ id: s.id, label: s.title }));

export default function PrivacyPage() {
  return (
    <div className="text-white">
      {/* Hero */}
      <section className="border-b border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: June 1, 2026</p>
        </div>
      </section>

      {/* Content with sticky ToC */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl flex gap-12 items-start">
          {/* Sticky ToC */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-24">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Contents</p>
            <nav className="space-y-2">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-sm text-gray-500 hover:text-green-400 transition-colors leading-snug"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 space-y-12 min-w-0">
            {sections.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                <div className="text-gray-400 leading-relaxed text-sm whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
