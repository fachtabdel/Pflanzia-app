import type { Metadata } from "next";
import Link from "next/link";
import { signUp } from "@/app/actions/auth";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { GoogleSignInButton } from "@/components/ui/GoogleSignInButton";

export const metadata: Metadata = {
  title: "Sign Up — Pflanzia",
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white">Create your account</h1>
        <p className="mt-1 text-gray-500 text-sm">Start identifying plants for free</p>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 flex flex-col gap-5">
        {/* OAuth buttons */}
        <div className="flex flex-col gap-3">
          <GoogleSignInButton />
          <button
            type="button"
            className="flex items-center justify-center gap-3 w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <span aria-hidden="true">⌥</span>
            Continue with GitHub
          </button>
        </div>

        <div className="flex items-center gap-3">
          <hr className="flex-1 border-gray-800" />
          <span className="text-xs text-gray-600">or</span>
          <hr className="flex-1 border-gray-800" />
        </div>

        {/* Registration form */}
        <form action={signUp} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-gray-300">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Jane Smith"
              className="rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
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
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="At least 8 characters"
              className="rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm" className="text-sm font-medium text-gray-300">
              Confirm password
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              placeholder="••••••••"
              className="rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          <div className="flex items-start gap-2 mt-1">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="mt-0.5 rounded border-gray-700 bg-gray-800 text-green-600"
            />
            <label htmlFor="terms" className="text-xs text-gray-400 leading-relaxed">
              I agree to the{" "}
              <Link href="/terms" className="text-green-400 hover:text-green-300 underline underline-offset-2">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-green-400 hover:text-green-300 underline underline-offset-2">
                Privacy Policy
              </Link>
            </label>
          </div>

          {params.error && (
            <p className="text-sm text-red-400 bg-red-950/40 border border-red-900/50 rounded-xl px-4 py-3">
              {params.error}
            </p>
          )}

          {params.message && (
            <p className="text-sm text-green-400 bg-green-950/40 border border-green-900/50 rounded-xl px-4 py-3">
              {params.message}
            </p>
          )}

          <SubmitButton className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-500 transition-colors mt-1">
            Create Account
          </SubmitButton>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-green-400 hover:text-green-300 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
