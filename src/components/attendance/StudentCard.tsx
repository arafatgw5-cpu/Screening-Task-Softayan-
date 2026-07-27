import { Student } from "@/types/student";
import { StatusBadge } from "./StatusBadge";
import { Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  className?: string;
}

export function StudentCard({ student, onEdit, className }: StudentCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-card p-5 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Student Info */}
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 text-zinc-600 dark:text-zinc-300 text-sm font-semibold ring-1 ring-zinc-200/80 dark:ring-zinc-700/80">
            {student.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-[14px] text-foreground truncate">
              {student.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">
              Roll {String(student.roll).padStart(2, "0")} &middot; Class{" "}
              {student.class} &middot; Sec {student.section}
            </p>
          </div>
        </div>

        {/* Status + Edit */}
        <div className="flex flex-col items-end gap-2.5 shrink-0">
          <StatusBadge status={student.status} />
          <button
            onClick={() => onEdit(student)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 rounded-full transition-all duration-200 hover:bg-zinc-200/90 dark:hover:bg-zinc-700/70 hover:text-foreground hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-sm active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          >
            <Edit2 className="h-3 w-3" />
            Edit
          </button>
        </div>
      </div>
    </motion.div>
  );
}