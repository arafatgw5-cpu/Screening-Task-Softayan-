import { Student } from "@/types/student";
import { StatusBadge } from "./StatusBadge";
import { Edit2, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  className?: string;
}

/**
 * StudentCard — Mobile-friendly card layout for individual students.
 * Displayed on viewports below `md` breakpoint.
 */
export function StudentCard({ student, onEdit, className }: StudentCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Student Info */}
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-gray-100 shrink-0"
            loading="lazy"
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-[14px] text-gray-900 truncate">
              {student.name}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">
              Roll {String(student.roll).padStart(2, "0")} &middot; Class{" "}
              {student.class} &middot; Sec {student.section}
            </p>
            <p className="text-[11px] text-gray-400 mt-1">{student.lastUpdated}</p>
          </div>
        </div>

        {/* Status + Actions */}
        <div className="flex flex-col items-end gap-2.5 shrink-0">
          <StatusBadge status={student.status} />
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onEdit(student)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200/60 rounded-lg transition-all hover:bg-blue-100 active:scale-[0.97]"
            >
              <Edit2 className="h-3 w-3" />
              Edit
            </button>
            <button className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 border border-gray-200/60 transition-colors">
              <MoreVertical className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}