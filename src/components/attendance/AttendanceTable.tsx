"use client";

import React from "react";
import { Student } from "@/types/student";
import { StatusBadge } from "./StatusBadge";
import { Edit, MoreVertical, ChevronLeft, ChevronRight, Eye, Trash2 } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AttendanceTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  currentPage: number;
  totalPages: number;
  totalStudents: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

/**
 * AttendanceTable — Premium data table with functional pagination and a context menu on the "More" button.
 */
export function AttendanceTable({
  students,
  onEdit,
  currentPage,
  totalPages,
  totalStudents,
  itemsPerPage,
  onPageChange,
}: AttendanceTableProps) {
  // ── Context menu state ──
  const [contextMenu, setContextMenu] = React.useState<{ studentId: number; x: number; y: number } | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close context menu on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    }
    if (contextMenu) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [contextMenu]);

  const handleMoreClick = (student: Student, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setContextMenu({
      studentId: student.id,
      x: rect.left - 120,
      y: rect.bottom + 4,
    });
  };

  // Pagination helpers
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalStudents);

  /** Build the array of page numbers to render with ellipsis logic */
  function getPageNumbers(): (number | "...")[] {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="py-4 px-6 text-[11px] font-bold text-gray-800 tracking-wide uppercase w-12">#</th>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-800 tracking-wide uppercase">Student Name</th>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-800 tracking-wide uppercase text-center">Roll No.</th>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-800 tracking-wide uppercase text-center">Class</th>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-800 tracking-wide uppercase text-center">Section</th>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-800 tracking-wide uppercase text-center">Status</th>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-800 tracking-wide uppercase text-center">Last Updated</th>
              <th className="py-4 px-6 text-[11px] font-bold text-gray-800 tracking-wide uppercase text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student, index) => (
              <tr
                key={student.id}
                className="group hover:bg-gray-50/50 transition-colors"
              >
                {/* Index — continuous across pages */}
                <td className="py-4 px-6 text-[13px] font-medium text-gray-500">
                  {startItem + index}
                </td>

                {/* Student Name + Avatar */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-9 h-9 rounded-full object-cover border-2 border-gray-100"
                      loading="lazy"
                    />
                    <span className="font-semibold text-[13px] text-gray-900">
                      {student.name}
                    </span>
                  </div>
                </td>

                {/* Roll No. */}
                <td className="py-4 px-6 text-[13px] text-gray-600 text-center font-medium tabular-nums">
                  {student.roll}
                </td>

                {/* Class */}
                <td className="py-4 px-6 text-[13px] text-gray-600 text-center font-medium">
                  {student.class}
                </td>

                {/* Section Badge */}
                <td className="py-4 px-6 text-center">
                  <span className="inline-flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold text-[11px] px-2.5 py-1 rounded-md">
                    {student.section}
                  </span>
                </td>

                {/* Status */}
                <td className="py-4 px-6 text-center">
                  <StatusBadge status={student.status} />
                </td>

                {/* Last Updated */}
                <td className="py-4 px-6 text-[12px] text-gray-400 font-medium text-center">
                  {student.lastUpdated}
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(student)}
                      className="w-7 h-7 rounded-md flex items-center justify-center text-blue-600 hover:bg-blue-50 border border-blue-200/60 transition-colors"
                      title="Edit Attendance"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleMoreClick(student, e)}
                      className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 border border-gray-200/60 transition-colors"
                      title="More Options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Pagination Footer ── */}
      <div className="border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-blue-500 font-medium">
          Showing {startItem} to {endItem} of {totalStudents} students
        </p>
        <div className="flex items-center gap-1.5">
          {/* Previous Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-gray-400 text-xs select-none">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  "w-8 h-8 rounded-lg font-medium text-[13px] flex items-center justify-center transition-all",
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                )}
              >
                {page}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Context Menu (portal-style, absolute) ── */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            style={{ position: "fixed", top: contextMenu.y, left: contextMenu.x, zIndex: 60 }}
            className="w-40 bg-white rounded-xl border border-gray-200 shadow-xl py-1.5"
          >
            <button
              onClick={() => {
                alert(`Viewing profile for student #${contextMenu.studentId}`);
                setContextMenu(null);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4 text-gray-400" />
              View Profile
            </button>
            <button
              onClick={() => {
                if (confirm(`Delete student #${contextMenu.studentId}?`)) {
                  alert(`Deleted student #${contextMenu.studentId}`);
                }
                setContextMenu(null);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}