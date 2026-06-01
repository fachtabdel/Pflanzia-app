interface ToxicityBannerProps {
  toxicity: string;
}

function getLevel(toxicity: string): "safe" | "caution" | "toxic" {
  const lower = toxicity.toLowerCase();
  if (lower.includes("non-toxic") || lower.includes("safe") || lower.includes("not toxic")) {
    return "safe";
  }
  if (lower.includes("mildly") || lower.includes("mild") || lower.includes("slight")) {
    return "caution";
  }
  return "toxic";
}

const levelConfig = {
  safe: {
    icon: "✅",
    label: "Safe",
    classes: "bg-green-900/40 border-green-800 text-green-300",
  },
  caution: {
    icon: "⚠️",
    label: "Mild caution",
    classes: "bg-yellow-900/40 border-yellow-800 text-yellow-300",
  },
  toxic: {
    icon: "☠️",
    label: "Toxic",
    classes: "bg-red-900/40 border-red-800 text-red-300",
  },
};

export default function ToxicityBanner({ toxicity }: ToxicityBannerProps) {
  const level = getLevel(toxicity);
  const { icon, label, classes } = levelConfig[level];

  return (
    <div className={`flex items-start gap-3 rounded-xl border p-4 ${classes}`}>
      <span className="text-xl shrink-0" aria-hidden="true">{icon}</span>
      <div>
        <p className="text-sm font-semibold mb-0.5">Toxicity — {label}</p>
        <p className="text-sm opacity-80">{toxicity}</p>
      </div>
    </div>
  );
}
