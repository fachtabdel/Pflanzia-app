import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works — Pflanzia",
  description:
    "Learn how Pflanzia identifies plants from photos and delivers detailed care instructions, toxicity info, and more using AI.",
};

const steps = [
  {
    number: "01",
    icon: "📷",
    title: "Upload a Photo",
    description:
      "Take a photo with your phone camera or upload an existing image. Pflanzia accepts JPG, PNG, and WEBP files up to 10 MB. The more of the plant is visible, the better the result.",
  },
  {
    number: "02",
    icon: "🤖",
    title: "AI Analyzes the Image",
    description:
      "Your photo is sent to our Cloudflare-powered vision AI (LLaVA model). It examines leaf shape, color, texture, stem structure, and other visual features to identify the species.",
  },
  {
    number: "03",
    icon: "📋",
    title: "Get Your Results",
    description:
      "Within seconds you receive the plant's common name, scientific name, family, confidence level, and a full care guide covering watering, sunlight, soil, humidity, temperature, and fertilizing.",
  },
  {
    number: "04",
    icon: "🔖",
    title: "Save & Track",
    description:
      "Save identifications to your personal collection. Browse your history anytime and build a library of all the plants you've encountered.",
  },
];

const deepDives = [
  {
    icon: "🎯",
    title: "Identification Accuracy",
    content:
      "Pflanzia uses the LLaVA 1.5 7B vision model running on Cloudflare AI infrastructure. It analyzes multiple visual features simultaneously and returns a confidence level (High, Medium, or Low) so you always know how certain the identification is. For best results, photograph the plant in good natural light with leaves clearly visible.",
  },
  {
    icon: "💧",
    title: "Care Instructions",
    content:
      "Every result includes a detailed care guide across six dimensions: watering frequency and method, sunlight requirements, ideal soil mix, humidity tolerance, temperature range, and fertilizing schedule. These are generated specifically for the identified species.",
  },
  {
    icon: "⚠️",
    title: "Toxicity Information",
    content:
      "Pflanzia tells you whether a plant is toxic to humans, pets, or both, with a clear color-coded alert. This is especially useful for households with cats, dogs, or young children.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="text-white">
      {/* Hero */}
      <section className="border-b border-gray-800 px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">How Pflanzia Works</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            From a single photo to a complete plant profile in seconds — here&apos;s exactly what happens under the hood.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-12">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`flex flex-col md:flex-row gap-8 items-start ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl font-black text-green-800">{step.number}</span>
                  <span className="text-3xl" aria-hidden="true">{step.icon}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{step.title}</h2>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
              <div className="flex-1 rounded-2xl border border-gray-800 bg-gray-900 p-8 flex items-center justify-center min-h-40">
                <span className="text-7xl" aria-hidden="true">{step.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deep dives */}
      <section className="border-t border-gray-800 bg-gray-900/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Feature deep-dives</h2>
          <div className="space-y-6">
            {deepDives.map((item) => (
              <details
                key={item.title}
                className="group rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden"
              >
                <summary className="flex items-center gap-3 px-6 py-5 cursor-pointer list-none select-none hover:bg-gray-800/60 transition-colors">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                  <span className="text-white font-semibold">{item.title}</span>
                  <span className="ml-auto text-gray-500 group-open:rotate-180 transition-transform text-xl">⌄</span>
                </summary>
                <div className="px-6 pb-6 text-gray-400 leading-relaxed text-sm border-t border-gray-800 pt-4">
                  {item.content}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to try it?</h2>
          <p className="text-gray-400 mb-8">
            Upload your first plant photo and get results in seconds — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="rounded-2xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="rounded-2xl border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
