import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Pflanzia",
  description: "Get in touch with the Pflanzia team. We typically respond within one business day.",
};

export default function ContactPage() {
  return (
    <div className="text-white">
      {/* Hero */}
      <section className="border-b border-gray-800 px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-400 text-lg">
            Questions, feedback, or partnership inquiries? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Form + info */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar info */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Email</h2>
              <p className="text-gray-400 text-sm">hello@pflanzia.app</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Response time</h2>
              <p className="text-gray-400 text-sm">We typically respond within one business day.</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Support topics</h2>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Account & billing</li>
                <li>• Plant identification issues</li>
                <li>• Feature requests</li>
                <li>• Bug reports</li>
                <li>• Partnerships</li>
              </ul>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 appearance-none"
                >
                  <option value="">Select a topic</option>
                  <option value="account">Account & billing</option>
                  <option value="identification">Plant identification issue</option>
                  <option value="feature">Feature request</option>
                  <option value="bug">Bug report</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell us how we can help..."
                  className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="self-start rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
