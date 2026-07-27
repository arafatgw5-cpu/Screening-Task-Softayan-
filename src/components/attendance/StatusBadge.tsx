import { AttendanceStatus } from "@/types/student";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: AttendanceStatus;
  className?: string;
}

const statusConfig: Record<
  AttendanceStatus,
  { label: string; bgClass: string; textClass: string; dotClass: string; borderClass: string; pulse?: boolean }
> = {
  present: {
    label: "Present",
    bgClass: "bg-emerald-100 dark:bg-emerald-500/15",
    textClass: "text-emerald-700 dark:text-emerald-400",
    dotClass: "bg-emerald-500",
    borderClass: "border-emerald-200 dark:border-emerald-500/30",
  },
  absent: {
    label: "Absent",
    bgClass: "bg-red-100 dark:bg-red-500/15",
    textClass: "text-red-700 dark:text-red-400",
    dotClass: "bg-red-500",
    borderClass: "border-red-200 dark:border-red-500/30",
    pulse: true,
  },
  leave: {
    label: "Leave",
    bgClass: "bg-amber-100 dark:bg-amber-500/15",
    textClass: "text-amber-700 dark:text-amber-400",
    dotClass: "bg-amber-500",
    borderClass: "border-amber-200 dark:border-amber-500/30",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-all duration-200",
        config.bgClass,
        config.textClass,
        config.borderClass,
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {config.pulse && (
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-60",
              config.dotClass
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex rounded-full h-1.5 w-1.5",
            config.dotClass
          )}
        />
      </span>
      {config.label}
    </span>
  );
}