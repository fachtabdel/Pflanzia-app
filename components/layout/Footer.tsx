import Link from "next/link";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "How it Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Explore", href: "/explore" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl" aria-hidden="true">🌿</span>
              <span className="text-lg font-bold text-white">Pflanzia</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              AI-powered plant identification and care assistant.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white mb-3">{col.heading}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Pflanzia. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs">Powered by Cloudflare AI</p>
        </div>
      </div>
    </footer>
  );
}
