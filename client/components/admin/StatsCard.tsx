interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    percentage: number;
    positive: boolean;
  };
  borderColor?: string;
  backgroundColor?: string;
  onClick?: () => void;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  borderColor = "#F58220",
  backgroundColor = "white",
  onClick,
  actionButton,
}: StatsCardProps) {
  return (
    <div
      onClick={onClick}
      className={`${backgroundColor === "white" ? "bg-white" : backgroundColor} rounded-lg shadow hover:shadow-md transition-shadow p-6 cursor-pointer border-l-4`}
      style={{ borderLeftColor: borderColor }}
    >
      {/* Header with Icon and Title */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-lato text-[#999999] font-semibold">
          {title}
        </h3>
        <div className="text-3xl">{icon}</div>
      </div>

      {/* Value */}
      <div className="mb-4">
        <p className="text-3xl font-playfair font-bold text-[#6B3E26]">
          {value}
        </p>
      </div>

      {/* Trend */}
      {trend && (
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-lato font-semibold ${
              trend.positive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.positive ? "↑" : "↓"} {Math.abs(trend.percentage)}%
          </span>
          <span className="text-xs text-[#999999] font-lato">vs hier</span>
        </div>
      )}

      {/* Action Button */}
      {actionButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            actionButton.onClick();
          }}
          className="mt-4 w-full px-4 py-2 bg-[#F58220] hover:bg-[#E06E10] text-white font-lato font-semibold text-sm rounded transition-colors"
        >
          {actionButton.label}
        </button>
      )}
    </div>
  );
}
