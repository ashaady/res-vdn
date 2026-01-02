import { OrderStatus } from "@/context/OrdersContext";

interface StatusBadgeProps {
  status: OrderStatus;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "subtle";
}

const statusConfig: Record<
  OrderStatus,
  { label: string; bgColor: string; textColor: string; icon: string }
> = {
  pending: {
    label: "En attente",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
    icon: "⏳",
  },
  in_preparation: {
    label: "En préparation",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    icon: "👨‍🍳",
  },
  ready: {
    label: "Prête",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
    icon: "✓",
  },
  completed: {
    label: "Livrée",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    icon: "✓",
  },
};

const sizeClasses = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

export default function StatusBadge({
  status,
  size = "md",
  variant = "solid",
}: StatusBadgeProps) {
  const config = statusConfig[status];

  if (variant === "outline") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full border-2 font-lato font-semibold ${sizeClasses[size]} ${config.textColor} border-current`}
      >
        <span>{config.icon}</span>
        {config.label}
      </span>
    );
  }

  if (variant === "subtle") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full font-lato font-semibold ${sizeClasses[size]} ${config.textColor} opacity-75`}
      >
        <span>{config.icon}</span>
        {config.label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-lato font-semibold ${sizeClasses[size]} ${config.bgColor} ${config.textColor}`}
    >
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}
