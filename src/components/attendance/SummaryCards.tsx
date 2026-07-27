import React from "react";
import { Student, AttendanceStatus } from "@/types/student";
import { Check, X, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type StatusFilter = "all" | AttendanceStatus;

interface SummaryCardsProps {
  students: Student[];
  selectedStatus: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
  className?: string;
}

/**
 * Each sparkline is a hand-crafted cubic bezier curve (C command) ensuring
 * perfectly smooth wave shapes with zero jaggedness.
 * The fill area is defined as: stroke path → vertical line to bottom-right →
 * horizontal line to bottom-left → close. This creates a seamless gradient
 * fill beneath the curve with no harsh edges.
 */
const sparklinePaths = {
  // Gently rising wave — optimistic "present" feel
  present: "M0,32 C12,30 20,22 32,18 C44,14 52,20 64,12 C76,4 88,8 100,2",
  // Volatile dip pattern — urgency of "absent"
  absent: "M0,20 C14,24 22,10 36,16 C50,22 58,6 72,14 C86,22 92,8 100,4",
  // Gentle oscillation — neutral "leave" feel
  leave: "M0,26 C16,20 24,30 40,22 C56,14 64,28 80,18 C90,12 96,16 100,8",
  // Steady climb — confident "total" feel
  all: "M0,28 C14,26 22,16 38,20 C54,24 62,10 76,14 C88,6 94,12 100,4",
};

const summaryConfig: {
  key: StatusFilter;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconBg: string;
  iconColor: string;
  labelColor: string;
  valueColor: string;
  themeColor: string; // hex for SVG stroke & gradient
  borderClass: string; // card 4 gets the purple border
  activeBorderColor: string;
}[] = [
  {
    key: "present",
    label: "Present",
    icon: Check,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    labelColor: "text-emerald-600",
    valueColor: "text-gray-900",
    themeColor: "#10B981",
    borderClass: "border border-gray-100",
    activeBorderColor: "#10B981",
  },
  {
    key: "absent",
    label: "Absent",
    icon: X,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    labelColor: "text-red-500",
    valueColor: "text-gray-900",
    themeColor: "#EF4444",
    borderClass: "border border-gray-100",
    activeBorderColor: "#EF4444",
  },
  {
    key: "leave",
    label: "Leave",
    icon: Clock,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    labelColor: "text-amber-600",
    valueColor: "text-gray-900",
    themeColor: "#F59E0B",
    borderClass: "border border-gray-100",
    activeBorderColor: "#F59E0B",
  },
  {
    key: "all",
    label: "Total Students",
    icon: Users,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
    labelColor: "text-indigo-600",
    valueColor: "text-gray-900",
    themeColor: "#6366F1",
    borderClass: "border-2 border-indigo-500",
    activeBorderColor: "#6366F1",
  },
];

/** Inline SVG sparkline with smooth cubic bezier curve and gradient area fill. */
function Sparkline({ path, color, id }: { path: string; color: string; id: string }) {
  return (
    <svg
      viewBox="0 0 100 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`sparkGrad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Gradient fill area — curve path closed to the bottom edge */}
      <path
        d={`${path} L100,40 L0,40 Z`}
        fill={`url(#sparkGrad-${id})`}
      />

      {/* Stroke line — the visible wave */}
      <path
        d={path}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function SummaryCards({
  students,
  selectedStatus,
  onStatusChange,
  className,
}: SummaryCardsProps) {
  const total = students.length;
  const present = students.filter((s) => s.status === "present").length;
  const absent = students.filter((s) => s.status === "absent").length;
  const leave = students.filter((s) => s.status === "leave").length;

  const counts: Record<StatusFilter, number> = { all: total, present, absent, leave };

  const getSubtitle = (key: StatusFilter) => {
    if (key === "all") return "Across 2 Classes";
    return `${total === 0 ? 0 : ((counts[key] / total) * 100).toFixed(1)}% of total`;
  };

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {summaryConfig.map((card) => {
        const isActive = selectedStatus === card.key;
        const Icon = card.icon;
        const sparkPath = sparklinePaths[card.key];

        return (
          <motion.button
            key={card.key}
            type="button"
            onClick={() => onStatusChange(card.key)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative bg-white rounded-2xl p-5 text-left cursor-pointer overflow-hidden group transition-shadow duration-200",
              card.borderClass,
              isActive ? "shadow-lg" : "shadow-sm hover:shadow-md"
            )}
            style={
              isActive
                ? {
                    outline: `2px solid ${card.activeBorderColor}`,
                    outlineOffset: "-1px",
                    boxShadow: `0 4px 20px -4px ${card.activeBorderColor}30`,
                  }
                : undefined
            }
          >
            {/* ── Content (above the sparkline) ── */}
            <div className="relative z-10 flex items-center gap-3">
              {/* Icon circle */}
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", card.iconBg)}>
                <Icon strokeWidth={2.5} className={cn("w-6 h-6", card.iconColor)} />
              </div>

              {/* Label + Value */}
              <div>
                <p className={cn("text-[13px] font-semibold", card.labelColor)}>{card.label}</p>
                <p className={cn("text-3xl font-bold tracking-tight mt-0.5", card.valueColor)}>
                  {counts[card.key]}
                </p>
              </div>
            </div>

            {/* Subtitle */}
            <p className="relative z-10 text-[11px] font-medium text-gray-400 mt-4">
              {getSubtitle(card.key)}
            </p>

            {/* ── Sparkline SVG — absolutely positioned, bottom-right ── */}
            <div className="absolute bottom-0 right-0 w-[120px] h-[52px] pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkline path={sparkPath} color={card.themeColor} id={card.key} />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}