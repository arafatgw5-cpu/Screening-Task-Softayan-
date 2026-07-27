import React from "react";
import { Student, AttendanceStatus } from "@/types/student";
import { Users, UserCheck, UserX, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type StatusFilter = "all" | AttendanceStatus;

interface SummaryCardsProps {
  students: Student[];
  selectedStatus: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  className?: string;
}

const summaryConfig: {
  key: StatusFilter;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  activeRing: string;
  iconBg: string;
}[] = [
  {
    key: "all",
    label: "Total Students",
    icon: Users,
    gradient:
      "from-blue-50/80 to-blue-100/40 dark:from-blue-900/20 dark:to-blue-900/5 border-blue-200/50 dark:border-blue-800/40",
    activeRing:
      "ring-2 ring-blue-500/40 dark:ring-blue-400/40 border-blue-300 dark:border-blue-700 shadow-blue-100/50 dark:shadow-blue-900/30",
    iconBg:
      "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 ring-blue-200/60 dark:ring-blue-700/40",
  },
  {
    key: "present",
    label: "Present",
    icon: UserCheck,
    gradient:
      "from-emerald-50/80 to-emerald-100/40 dark:from-emerald-900/20 dark:to-emerald-900/5 border-emerald-200/50 dark:border-emerald-800/40",
    activeRing:
      "ring-2 ring-emerald-500/40 dark:ring-emerald-400/40 border-emerald-300 dark:border-emerald-700 shadow-emerald-100/50 dark:shadow-emerald-900/30",
    iconBg:
      "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 ring-emerald-200/60 dark:ring-emerald-700/40",
  },
  {
    key: "absent",
    label: "Absent",
    icon: UserX,
    gradient:
      "from-red-50/80 to-red-100/40 dark:from-red-900/20 dark:to-red-900/5 border-red-200/50 dark:border-red-800/40",
    activeRing:
      "ring-2 ring-red-500/40 dark:ring-red-400/40 border-red-300 dark:border-red-700 shadow-red-100/50 dark:shadow-red-900/30",
    iconBg:
      "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 ring-red-200/60 dark:ring-red-700/40",
  },
  {
    key: "leave",
    label: "On Leave",
    icon: Clock,
    gradient:
      "from-amber-50/80 to-amber-100/40 dark:from-amber-900/20 dark:to-amber-900/5 border-amber-200/50 dark:border-amber-800/40",
    activeRing:
      "ring-2 ring-amber-500/40 dark:ring-amber-400/40 border-amber-300 dark:border-amber-700 shadow-amber-100/50 dark:shadow-amber-900/30",
    iconBg:
      "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 ring-amber-200/60 dark:ring-amber-700/40",
  },
];

export function SummaryCards({
  students,
  selectedStatus,
  onStatusChange,
  className,
}: SummaryCardsProps) {
  const counts = {
    all: students.length,
    present: students.filter((s) => s.status === "present").length,
    absent: students.filter((s) => s.status === "absent").length,
    leave: students.filter((s) => s.status === "leave").length,
  };

  return (
    <div
      className={cn(
        "grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5",
        className
      )}
    >
      {summaryConfig.map(
        ({ key, label, icon: Icon, gradient, activeRing, iconBg }) => {
          const isActive = selectedStatus === key;

          return (
            <motion.button
              key={key}
              type="button"
              onClick={() => onStatusChange(key)}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "relative rounded-2xl border bg-gradient-to-br p-5 text-left transition-all duration-200 cursor-pointer select-none",
                gradient,
                isActive
                  ? cn("shadow-lg", activeRing)
                  : "shadow-sm hover:shadow-lg ring-0"
              )}
            >
              {/* Active indicator bar */}
              {isActive && (
                <motion.div
                  layoutId="activeCardIndicator"
                  className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-current opacity-40"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold tracking-wider uppercase opacity-70">
                    {label}
                  </p>
                  <p className="text-3xl font-bold tracking-tight tabular-nums">
                    {counts[key]}
                  </p>
                </div>
                <div
                  className={cn(
                    "rounded-xl p-2.5 ring-1 shadow-inner transition-transform duration-200",
                    iconBg,
                    isActive && "scale-110"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </motion.button>
          );
        }
      )}
    </div>
  );
}