import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Pflanzia",
  description:
    "Learn about the mission behind Pflanzia — an AI-powered plant identification and care assistant built for plant lovers everywhere.",
};

const values = [
  {
    icon: "🎯",
    title: "Accuracy First",
    description:
      "We use state-of-the-art vision AI to ensure every identification is as precise as possible, always surfacing a confidence level so you know how to interpret the result.",
  },
  {
    icon: "🌍",
    title: "Sustainability",
    description:
      "Understanding plants is the first step to protecting them. We believe better plant knowledge leads to healthier ecosystems and more thoughtful gardening.",
  },
  {
    icon: "♿",
    title: "Accessibility",
    description:
      "Expert plant knowledge shouldn't be locked behind books or expensive consultants. Pflanzia brings professional-grade identification to anyone with a smartphone.",
  },
];

const team = [
  {
    name: "The Pflanzia Team",
    role: "Builders & Plant Lovers",
    avatar: "🌿",
    bio: "A small team passionate about combining AI with nature to make plant identification available to everyone.",
  },
];

export default function AboutPage() {
  return (
    <div className="text-white">
      {/* Hero */}
      <section className="border-b border-gray-800 px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <span className="text-6xl mb-6 block" aria-hidden="true">🌿</span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Pflanzia</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            We believe everyone deserves to understand the plants around them — from the
            succulent on their desk to the mystery shrub in the backyard.
          </p>
        </div>
      </section>

      {/* Mission / Story */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-6">Our story</h2>
          <div className="space-y-5 text-gray-400 leading-relaxed">
            <p>
              Pflanzia was born out of a simple frustration: standing in front of a beautiful plant
              with no idea what it was or how to care for it. Plant identification books are heavy,
              apps are slow, and experts are hard to reach.
            </p>
            <p>
              We built Pflanzia to solve that in a single photo. By combining the latest open vision
              AI models with a clean, fast interface, we made it possible to identify any plant in
              seconds — along with everything you need to keep it alive and thriving.
            </p>
            <p>
              Today, thousands of plant lovers use Pflanzia to identify discoveries on walks, check
              if a new houseplant is safe for their pets, and build a living record of every plant
              they&apos;ve ever encountered.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Our values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-6 flex flex-col gap-3"
              >
                <span className="text-4xl" aria-hidden="true">{v.icon}</span>
                <h3 className="text-white font-semibold text-lg">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-gray-800 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-10">Meet the team</h2>
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-gray-800 bg-gray-900 p-8 flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 rounded-full bg-green-900/40 border border-green-800 flex items-center justify-center text-4xl">
                {member.avatar}
              </div>
              <div>
                <p className="text-white font-bold text-lg">{member.name}</p>
                <p className="text-green-400 text-sm">{member.role}</p>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold text-white mb-4">Join our community</h2>
          <p className="text-gray-400 mb-8">
            Start identifying plants today and become part of a growing community of plant enthusiasts.
          </p>
          <Link
            href="/sign-up"
            className="inline-block rounded-2xl bg-green-600 px-7 py-3.5 text-base font-semibold text-white hover:bg-green-500 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
