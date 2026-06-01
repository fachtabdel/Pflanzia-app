import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

// Mock user data — replace with Supabase Auth user once connected
const mockUser = {
  name: "Jane Smith",
  email: "jane@example.com",
  joinedAt: "2026-01-15T00:00:00Z",
  plan: "Free",
};

export default function ProfilePage() {
  return (
    <div className="px-4 py-10 sm:px-8 max-w-2xl mx-auto">
      <PageHeader title="Profile & Settings" />

      {/* Profile info */}
      <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">Account</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-green-900/40 border border-green-800 flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <p className="text-white font-semibold">{mockUser.name}</p>
            <p className="text-gray-500 text-sm">{mockUser.email}</p>
            <p className="text-gray-600 text-xs mt-0.5">
              Member since{" "}
              {new Date(mockUser.joinedAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="display-name" className="text-sm font-medium text-gray-300">
              Display name
            </label>
            <input
              id="display-name"
              defaultValue={mockUser.name}
              className="rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input
              defaultValue={mockUser.email}
              disabled
              className="rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>
          <button className="self-start rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-500 transition-colors">
            Save Changes
          </button>
        </div>
      </section>

      {/* Change password */}
      <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">Password</h2>
        <div className="flex flex-col gap-4">
          {[
            { id: "current-pw", label: "Current password", placeholder: "••••••••" },
            { id: "new-pw", label: "New password", placeholder: "At least 8 characters" },
            { id: "confirm-pw", label: "Confirm new password", placeholder: "••••••••" },
          ].map((field) => (
            <div key={field.id} className="flex flex-col gap-1.5">
              <label htmlFor={field.id} className="text-sm font-medium text-gray-300">
                {field.label}
              </label>
              <input
                id={field.id}
                type="password"
                placeholder={field.placeholder}
                className="rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
              />
            </div>
          ))}
          <button className="self-start rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-500 transition-colors">
            Update Password
          </button>
        </div>
      </section>

      {/* Subscription */}
      <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Subscription</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">{mockUser.plan} Plan</p>
            <p className="text-gray-500 text-sm">10 identifications / month</p>
          </div>
          <Link
            href="/pricing"
            className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
          >
            Upgrade to Pro
          </Link>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Notifications</h2>
        <div className="space-y-3">
          {[
            { id: "notif-tips", label: "Plant care tips" },
            { id: "notif-news", label: "Product updates" },
          ].map((pref) => (
            <div key={pref.id} className="flex items-center justify-between">
              <label htmlFor={pref.id} className="text-sm text-gray-300">{pref.label}</label>
              <input
                id={pref.id}
                type="checkbox"
                defaultChecked
                className="rounded border-gray-700 bg-gray-800 text-green-600"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Actions */}
      <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Actions</h2>
        <div className="flex flex-col gap-3">
          <button className="self-start rounded-xl border border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors">
            Sign Out
          </button>
          <button className="self-start rounded-xl border border-red-800 px-5 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-900/30 transition-colors">
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
}
