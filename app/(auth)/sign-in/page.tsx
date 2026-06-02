import type { Metadata } from "next";
import Link from "next/link";
import { signIn } from "@/app/actions/auth";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { GoogleSignInButton } from "@/components/ui/GoogleSignInButton";

export const metadata: Metadata = {
  title: "Sign In — Pflanzia",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="mt-1 text-gray-500 text-sm">Sign in to your Pflanzia account</p>
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

        {/* Email/password form */}
        <form action={signIn} className="flex flex-col gap-4">
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-green-400 hover:text-green-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="rounded border-gray-700 bg-gray-800 text-green-600"
            />
            <label htmlFor="remember" className="text-sm text-gray-400">
              Remember me
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
            Sign In
          </SubmitButton>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-green-400 hover:text-green-300 font-medium transition-colors">
          Sign up free
        </Link>
      </p>
    </div>
  );
}
