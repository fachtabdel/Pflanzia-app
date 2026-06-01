interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({ title, description, className = "" }: PageHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      {description && (
        <p className="mt-2 text-gray-400 text-base leading-relaxed">{description}</p>
      )}
    </div>
  );
}
