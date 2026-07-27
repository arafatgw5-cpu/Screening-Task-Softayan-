"use client";

import React from "react";
import { X, Plus } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { AttendanceStatus } from "@/types/student";
import { cn } from "@/lib/utils";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; class: string; section: string; roll: number; status: AttendanceStatus }) => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 28, mass: 0.8 },
  },
  exit: { opacity: 0, scale: 0.96, y: 6, transition: { duration: 0.15, ease: "easeIn" } },
};

/**
 * AddStudentModal — Form modal triggered by the "+ Add Student" button.
 */
export function AddStudentModal({ isOpen, onClose, onAdd }: AddStudentModalProps) {
  const [name, setName] = React.useState("");
  const [cls, setCls] = React.useState("10-A");
  const [section, setSection] = React.useState("A");
  const [roll, setRoll] = React.useState("");
  const [status, setStatus] = React.useState<AttendanceStatus>("present");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !roll.trim()) return;
    onAdd({ name: name.trim(), class: cls, section, roll: parseInt(roll, 10), status });
    // Reset form
    setName("");
    setRoll("");
    setCls("10-A");
    setSection("A");
    setStatus("present");
    onClose();
  };

  // Close on Escape
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const inputClasses = "w-full h-11 px-3.5 text-[13px] rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all";
  const selectClasses = "w-full h-11 px-3 text-[13px] rounded-xl border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all appearance-none cursor-pointer";
  const labelClasses = "block text-[11px] font-bold text-gray-900 mb-2 uppercase tracking-wide";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="add-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="add-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-student-title"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-[440px] rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-4">
              <h2 id="add-student-title" className="text-lg font-bold text-gray-900">
                Add New Student
              </h2>
              <p className="text-[13px] text-gray-500 mt-1">Fill in the details to register a new student.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="student-name" className={labelClasses}>Student Name</label>
                <input
                  id="student-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ayesha Khan"
                  required
                  className={inputClasses}
                />
              </div>

              {/* Roll & Class — side by side */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="student-roll" className={labelClasses}>Roll No.</label>
                  <input
                    id="student-roll"
                    type="number"
                    value={roll}
                    onChange={(e) => setRoll(e.target.value)}
                    placeholder="e.g. 106"
                    required
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="student-class" className={labelClasses}>Class</label>
                  <select
                    id="student-class"
                    value={cls}
                    onChange={(e) => setCls(e.target.value)}
                    className={selectClasses}
                  >
                    <option value="10-A">10-A</option>
                    <option value="10-B">10-B</option>
                    <option value="11-A">11-A</option>
                    <option value="9-A">9-A</option>
                    <option value="9-B">9-B</option>
                  </select>
                </div>
              </div>

              {/* Section & Status — side by side */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="student-section" className={labelClasses}>Section</label>
                  <select
                    id="student-section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className={selectClasses}
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="student-status" className={labelClasses}>Status</label>
                  <select
                    id="student-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as AttendanceStatus)}
                    className={selectClasses}
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="leave">Leave</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-10 px-5 text-[13px] font-medium rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 text-[13px] font-semibold rounded-xl bg-blue-600 text-white inline-flex items-center gap-1.5 shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Student
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
