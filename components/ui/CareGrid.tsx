export interface CareInstructions {
  watering: string;
  sunlight: string;
  soil: string;
  humidity: string;
  temperature: string;
  fertilizing: string;
}

interface CareGridProps {
  care: CareInstructions;
}

const careItems = [
  { key: "watering" as const, label: "Watering", icon: "💧" },
  { key: "sunlight" as const, label: "Sunlight", icon: "☀️" },
  { key: "soil" as const, label: "Soil", icon: "🪴" },
  { key: "humidity" as const, label: "Humidity", icon: "💨" },
  { key: "temperature" as const, label: "Temperature", icon: "🌡️" },
  { key: "fertilizing" as const, label: "Fertilizing", icon: "🌱" },
];

export default function CareGrid({ care }: CareGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {careItems.map(({ key, label, icon }) => (
        <div
          key={key}
          className="rounded-xl border border-gray-800 bg-gray-900 p-4 flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">{icon}</span>
            <span className="text-sm font-semibold text-white">{label}</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">{care[key]}</p>
        </div>
      ))}
    </div>
  );
}
