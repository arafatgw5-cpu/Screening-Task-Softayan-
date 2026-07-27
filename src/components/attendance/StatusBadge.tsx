import { AttendanceStatus } from "@/types/student";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: AttendanceStatus;
  className?: string;
}

const statusConfig: Record<
  AttendanceStatus,
  { label: string; bgClass: string; textClass: string; dotClass: string; ringClass: string; pulse?: boolean }
> = {
  present: {
    label: "Present",
    bgClass: "bg-emerald-500/8 dark:bg-emerald-500/12",
    textClass: "text-emerald-700 dark:text-emerald-400",
    dotClass: "bg-emerald-500",
    ringClass: "ring-emerald-500/20 dark:ring-emerald-400/20",
  },
  absent: {
    label: "Absent",
    bgClass: "bg-red-500/8 dark:bg-red-500/12",
    textClass: "text-red-700 dark:text-red-400",
    dotClass: "bg-red-500",
    ringClass: "ring-red-500/20 dark:ring-red-400/20",
    pulse: true,
  },
  leave: {
    label: "Leave",
    bgClass: "bg-amber-500/8 dark:bg-amber-500/12",
    textClass: "text-amber-700 dark:text-amber-400",
    dotClass: "bg-amber-500",
    ringClass: "ring-amber-500/20 dark:ring-amber-400/20",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ring-1 transition-colors",
        config.bgClass,
        config.textClass,
        config.ringClass,
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