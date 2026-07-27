import { AttendanceStatus } from "@/types/student";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: AttendanceStatus;
  className?: string;
}

const statusConfig: Record<
  AttendanceStatus,
  { label: string; bgClass: string; textClass: string; dotClass: string; pulse?: boolean }
> = {
  present: {
    label: "Present",
    bgClass: "bg-[#E6F9F0] dark:bg-emerald-500/15",
    textClass: "text-[#10B981] dark:text-emerald-400",
    dotClass: "bg-[#10B981]",
  },
  absent: {
    label: "Absent",
    bgClass: "bg-[#FEE2E2] dark:bg-red-500/15",
    textClass: "text-[#EF4444] dark:text-red-400",
    dotClass: "bg-[#EF4444]",
    pulse: true,
  },
  leave: {
    label: "Leave",
    bgClass: "bg-[#FEF3C7] dark:bg-amber-500/15",
    textClass: "text-[#F59E0B] dark:text-amber-400",
    dotClass: "bg-[#F59E0B]",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200",
        config.bgClass,
        config.textClass,
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