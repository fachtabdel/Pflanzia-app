type Confidence = "high" | "medium" | "low";

interface ConfidenceBadgeProps {
  confidence: Confidence;
  className?: string;
}

const styles: Record<Confidence, string> = {
  high: "bg-green-900/50 text-green-400 border border-green-800",
  medium: "bg-yellow-900/50 text-yellow-400 border border-yellow-800",
  low: "bg-red-900/50 text-red-400 border border-red-800",
};

const labels: Record<Confidence, string> = {
  high: "High Confidence",
  medium: "Medium Confidence",
  low: "Low Confidence",
};

export default function ConfidenceBadge({ confidence, className = "" }: ConfidenceBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[confidence]} ${className}`}
    >
      {labels[confidence]}
    </span>
  );
}
