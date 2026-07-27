"use client";

import React from "react";
import { Student, AttendanceStatus } from "@/types/student";
import { StatusBadge } from "./StatusBadge";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AttendanceModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (studentId: number, status: AttendanceStatus) => void;
}

const statusOptions: { value: AttendanceStatus; label: string; dotColor: string; description: string }[] = [
  {
    value: "present",
    label: "Present",
    dotColor: "bg-emerald-500",
    description: "Student attended the class",
  },
  {
    value: "absent",
    label: "Absent",
    dotColor: "bg-red-500",
    description: "Student did not attend",
  },
  {
    value: "leave",
    label: "Leave",
    dotColor: "bg-amber-500",
    description: "Approved leave of absence",
  },
];

// Animation variants
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 28,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 6,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

export function AttendanceModal({
  student,
  isOpen,
  onClose,
  onSave,
}: AttendanceModalProps) {
  const [selectedStatus, setSelectedStatus] = React.useState<AttendanceStatus>(
    student?.status || "present"
  );

  // Sync status when student changes
  const [prevStudent, setPrevStudent] = React.useState<Student | null>(student);
  if (student !== prevStudent) {
    setPrevStudent(student);
    if (student) {
      setSelectedStatus(student.status);
    }
  }

  const handleSave = () => {
    if (student) {
      onSave(student.id, selectedStatus);
      onClose();
    }
  };

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && student && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Box */}
          <motion.div
            key="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-[420px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-background/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-lg p-1 text-muted-foreground/60 transition-all hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-4">
              <h2
                id="modal-title"
                className="text-lg font-semibold tracking-tight text-foreground"
              >
                Update Attendance
              </h2>
              <p className="text-[13px] text-muted-foreground mt-1">
                Change the attendance status for this student.
              </p>
            </div>

            <div className="px-6 pb-6 space-y-5">
              {/* Student Info Card */}
              <div className="rounded-xl bg-zinc-50/80 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/60 p-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 text-zinc-600 dark:text-zinc-300 text-base font-semibold ring-1 ring-zinc-200/80 dark:ring-zinc-700/80">
                    {student.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[15px] text-foreground truncate">
                      {student.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                      Roll {String(student.roll).padStart(2, "0")} &middot;
                      Class {student.class} &middot; Sec {student.section}
                    </p>
                    <div className="mt-2">
                      <StatusBadge status={student.status} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Selection — Radio Cards */}
              <div className="space-y-2.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  New Status
                </label>
                <div className="space-y-2">
                  {statusOptions.map((option) => {
                    const isSelected = selectedStatus === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setSelectedStatus(option.value)}
                        className={cn(
                          "relative w-full flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-150",
                          isSelected
                            ? "border-foreground/20 bg-zinc-50 dark:bg-zinc-800/50 ring-1 ring-foreground/10 shadow-sm"
                            : "border-zinc-200/80 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
                        )}
                      >
                        {/* Radio circle */}
                        <div
                          className={cn(
                            "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-150",
                            isSelected
                              ? "border-foreground bg-foreground"
                              : "border-zinc-300 dark:border-zinc-600"
                          )}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                              className="h-1.5 w-1.5 rounded-full bg-background"
                            />
                          )}
                        </div>

                        {/* Dot + Text */}
                        <div className="flex items-center gap-2.5 flex-1">
                          <span
                            className={cn(
                              "h-2 w-2 rounded-full shrink-0",
                              option.dotColor
                            )}
                          />
                          <div>
                            <p
                              className={cn(
                                "text-sm font-medium transition-colors",
                                isSelected
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              )}
                            >
                              {option.label}
                            </p>
                            <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={onClose}
                  className="h-10 px-5 text-[13px] font-medium rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 bg-transparent text-foreground transition-all duration-150 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="h-10 px-5 text-[13px] font-medium rounded-xl bg-foreground text-background inline-flex items-center gap-1.5 transition-all duration-150 hover:bg-foreground/90 shadow-sm hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                >
                  <Check className="h-3.5 w-3.5" />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}