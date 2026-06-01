import Link from "next/link";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
}

export default function EmptyState({ icon = "🌿", title, description, cta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <span className="text-6xl mb-4" aria-hidden="true">{icon}</span>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-6">{description}</p>
      )}
      {cta && (
        <Link
          href={cta.href}
          className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}
