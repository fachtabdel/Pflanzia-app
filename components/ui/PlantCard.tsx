import Link from "next/link";
import ConfidenceBadge from "./ConfidenceBadge";

type Confidence = "high" | "medium" | "low";

export interface PlantCardProps {
  id: string;
  commonName: string;
  scientificName?: string;
  confidence?: Confidence;
  date?: string;
  family?: string;
}

export default function PlantCard({
  id,
  commonName,
  scientificName,
  confidence,
  date,
  family,
}: PlantCardProps) {
  return (
    <Link
      href={`/result/${id}`}
      className="group block rounded-2xl border border-gray-800 bg-gray-900 p-4 hover:border-green-700 hover:bg-gray-800/60 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800 text-2xl shrink-0">
          🌿
        </div>
        {confidence && <ConfidenceBadge confidence={confidence} />}
      </div>

      <h3 className="text-white font-semibold text-sm group-hover:text-green-400 transition-colors leading-snug">
        {commonName}
      </h3>

      {scientificName && (
        <p className="text-gray-500 text-xs italic mt-0.5">{scientificName}</p>
      )}

      {family && (
        <p className="text-gray-600 text-xs mt-1">{family}</p>
      )}

      {date && (
        <p className="text-gray-600 text-xs mt-2 pt-2 border-t border-gray-800">
          {new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}
    </Link>
  );
}
