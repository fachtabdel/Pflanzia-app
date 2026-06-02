"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/actions/auth";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "⊞" },
  { label: "Identify Plant", href: "/identify", icon: "🔍" },
  { label: "History", href: "/history", icon: "🕐" },
  { label: "Saved Plants", href: "/saved", icon: "🔖" },
  { label: "Explore", href: "/explore", icon: "🌍" },
  { label: "Profile", href: "/profile", icon: "👤" },
];

export default function AppSidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-60 border-r border-gray-800 bg-gray-950 min-h-screen shrink-0">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-gray-800">
        <span className="text-xl" aria-hidden="true">🌿</span>
        <span className="text-lg font-bold text-white">Pflanzia</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-green-900/40 text-green-400"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-base w-5 text-center" aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-800 flex flex-col gap-1">
        {userEmail && (
          <div className="px-3 py-2 mb-1">
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
        )}

        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-400 hover:bg-gray-800 transition-colors text-left"
          >
            <span className="text-base w-5 text-center" aria-hidden="true">↩</span>
            Sign Out
          </button>
        </form>

        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors"
        >
          <span className="text-base w-5 text-center" aria-hidden="true">←</span>
          Back to site
        </Link>
      </div>
    </aside>
  );
}
