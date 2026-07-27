import { Student } from "@/types/student";
import { StatusBadge } from "./StatusBadge";
import { Edit2 } from "lucide-react";
import { motion } from "framer-motion";

interface AttendanceTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
}

export function AttendanceTable({ students, onEdit }: AttendanceTableProps) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-card shadow-sm overflow-hidden">
      {/* Table Header Title */}
      <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800/60 bg-gradient-to-r from-zinc-50/80 to-transparent dark:from-zinc-900/40 dark:to-transparent">
        <h3 className="font-semibold text-base tracking-tight text-foreground">
          Student Attendance
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {students.length} student{students.length !== 1 ? "s" : ""} listed
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/60 dark:bg-zinc-900/30">
              <th className="py-3.5 px-6 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                Student
              </th>
              <th className="py-3.5 px-6 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                Roll
              </th>
              <th className="py-3.5 px-6 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                Class
              </th>
              <th className="py-3.5 px-6 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                Section
              </th>
              <th className="py-3.5 px-6 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                Status
              </th>
              <th className="py-3.5 px-6 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
            {students.map((student) => (
              <motion.tr
                key={student.id}
                whileHover={{ backgroundColor: "var(--color-muted)" }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="group transition-colors"
              >
                {/* Student Name + Avatar */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 text-zinc-600 dark:text-zinc-300 text-sm font-semibold ring-1 ring-zinc-200/80 dark:ring-zinc-700/80">
                        {student.name.charAt(0)}
                      </div>
                    </div>
                    <span className="font-medium text-[13.5px] text-foreground">
                      {student.name}
                    </span>
                  </div>
                </td>

                {/* Roll */}
                <td className="py-4 px-6">
                  <span className="text-[13px] text-muted-foreground font-mono tabular-nums">
                    {String(student.roll).padStart(2, "0")}
                  </span>
                </td>

                {/* Class */}
                <td className="py-4 px-6">
                  <span className="text-[13px] text-muted-foreground">
                    Class {student.class}
                  </span>
                </td>

                {/* Section */}
                <td className="py-4 px-6">
                  <span className="text-[13px] text-muted-foreground">
                    Sec {student.section}
                  </span>
                </td>

                {/* Status */}
                <td className="py-4 px-6">
                  <StatusBadge status={student.status} />
                </td>

                {/* Always-visible Edit Button */}
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => onEdit(student)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 rounded-full transition-all duration-200 hover:bg-zinc-200/90 dark:hover:bg-zinc-700/70 hover:text-foreground hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-sm active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                  >
                    <Edit2 className="h-3 w-3" />
                    Edit
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}