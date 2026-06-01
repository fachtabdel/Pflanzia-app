import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pflanzia — AI Plant Identification & Care",
  description:
    "Upload a photo and instantly identify any plant. Get detailed care instructions, toxicity info, and save your discoveries.",
  openGraph: {
    title: "Pflanzia — AI Plant Identification & Care",
    description:
      "Upload a photo and instantly identify any plant with AI. Get watering, sunlight, and toxicity guidance instantly.",
    type: "website",
  },
};

const features = [
  {
    icon: "🔍",
    title: "Instant Identification",
    description: "AI identifies your plant from any photo in under 5 seconds.",
  },
  {
    icon: "💧",
    title: "Care Instructions",
    description: "Detailed watering, sunlight, soil, and temperature guides for every plant.",
  },
  {
    icon: "☠️",
    title: "Toxicity Alerts",
    description: "Know immediately if a plant is safe for pets and children.",
  },
  {
    icon: "📚",
    title: "Plant History",
    description: "Every identification is saved so you can revisit it anytime.",
  },
];

const steps = [
  { number: "01", title: "Upload a Photo", description: "Drag and drop or take a photo directly from your phone." },
  { number: "02", title: "AI Analyzes", description: "Our Cloudflare-powered vision model processes the image instantly." },
  { number: "03", title: "Get Full Results", description: "View care guide, toxicity status, problems, and more." },
];

const stats = [
  { value: "50,000+", label: "Plants Identified" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "10,000+", label: "Happy Users" },
];

const testimonials = [
  {
    quote: "I finally know what that mystery plant in my garden is. Care instructions were spot on.",
    name: "Sophie R.",
    role: "Home Gardener",
  },
  {
    quote: "The toxicity feature saved me — my cat was sniffing something dangerous.",
    name: "Marcus L.",
    role: "Cat Dad & Plant Lover",
  },
  {
    quote: "Fastest and most accurate plant ID app I've used. The care guide is genuinely useful.",
    name: "Aya T.",
    role: "Botanist",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-950 text-white flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-24 sm:py-32 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.12),transparent_60%)] pointer-events-none" />
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-800 bg-green-900/30 px-4 py-1.5 text-sm text-green-400 mb-6">
              <span aria-hidden="true">🌿</span> AI-powered plant identification
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Identify Any Plant{" "}
              <span className="text-green-400">in Seconds</span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
              Upload a photo and let AI tell you exactly what plant it is, how to care for
              it, and whether it&apos;s safe for your pets.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="rounded-2xl bg-green-600 px-7 py-3.5 text-base font-semibold text-white hover:bg-green-500 transition-colors shadow-lg shadow-green-900/30"
              >
                Try It Free
              </Link>
              <Link
                href="/how-it-works"
                className="rounded-2xl border border-gray-700 px-7 py-3.5 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-gray-800 bg-gray-900/40 px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-4xl grid grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-white">Everything you need to know your plants</h2>
              <p className="mt-3 text-gray-400 max-w-xl mx-auto">
                One photo gives you a complete plant profile — identification, care, and safety.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-gray-800 bg-gray-900 p-6 flex flex-col gap-3 hover:border-green-800 transition-colors"
                >
                  <span className="text-4xl" aria-hidden="true">{f.icon}</span>
                  <h3 className="text-white font-semibold">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works teaser */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-white">How it works</h2>
              <p className="mt-3 text-gray-400">Three steps from photo to plant expert.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col gap-3 text-center md:text-left">
                  <span className="text-4xl font-bold text-green-800 text-center md:text-left">{step.number}</span>
                  <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/how-it-works"
                className="text-sm text-green-400 hover:text-green-300 underline underline-offset-4"
              >
                Learn more about how Pflanzia works →
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-t border-gray-800 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">What our users say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-2xl border border-gray-800 bg-gray-900 p-6 flex flex-col gap-4"
                >
                  <p className="text-gray-300 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-400 mb-8">
              Start free. Upgrade when you need more identifications and advanced features.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mb-10">
              <div className="rounded-2xl border border-gray-700 bg-gray-900 p-6">
                <p className="text-white font-bold text-xl mb-1">Free</p>
                <p className="text-gray-400 text-sm mb-4">Perfect for casual plant lovers</p>
                <p className="text-3xl font-bold text-white mb-6">
                  $0<span className="text-gray-500 text-base font-normal">/mo</span>
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>✓ 10 identifications / month</li>
                  <li>✓ Care instructions</li>
                  <li>✓ Toxicity alerts</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-green-700 bg-green-900/20 p-6 relative">
                <span className="absolute top-4 right-4 rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                  Popular
                </span>
                <p className="text-white font-bold text-xl mb-1">Pro</p>
                <p className="text-gray-400 text-sm mb-4">For serious plant enthusiasts</p>
                <p className="text-3xl font-bold text-white mb-6">
                  $9<span className="text-gray-500 text-base font-normal">/mo</span>
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>✓ Unlimited identifications</li>
                  <li>✓ Everything in Free</li>
                  <li>✓ Plant encyclopedia access</li>
                  <li>✓ Priority support</li>
                </ul>
              </div>
            </div>
            <Link
              href="/pricing"
              className="text-sm text-green-400 hover:text-green-300 underline underline-offset-4"
            >
              View full pricing details →
            </Link>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="border-t border-gray-800 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Start identifying plants today
            </h2>
            <p className="text-gray-400 mb-8">
              Join thousands of plant lovers who use Pflanzia to understand and care for their plants.
            </p>
            <Link
              href="/sign-up"
              className="inline-block rounded-2xl bg-green-600 px-8 py-4 text-base font-semibold text-white hover:bg-green-500 transition-colors shadow-lg shadow-green-900/30"
            >
              Get Started for Free
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
