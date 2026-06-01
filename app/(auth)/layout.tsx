import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <div className="flex justify-center py-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">🌿</span>
          <span className="text-xl font-bold text-white">Pflanzia</span>
        </Link>
      </div>
      <main className="flex-1 flex items-center justify-center px-4 pb-12">
        {children}
      </main>
    </div>
  );
}
