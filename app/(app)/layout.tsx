import AppSidebar from "@/components/layout/AppSidebar";

// Add Supabase session check here once @supabase/ssr is installed.
// Unauthenticated requests should redirect to /sign-in via middleware.ts.
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <AppSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
