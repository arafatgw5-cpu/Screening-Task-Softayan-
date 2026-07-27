"use client";

import React from "react";
import { Student, AttendanceStatus } from "@/types/student";
import { mockStudents } from "@/data/students";
import { SummaryCards } from "@/components/attendance/SummaryCards";
import { SearchFilter } from "@/components/attendance/SearchFilter";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { StudentCard } from "@/components/attendance/StudentCard";
import { AttendanceModal } from "@/components/attendance/AttendanceModal";
import { AddStudentModal } from "@/components/attendance/AddStudentModal";
import { LoadingSkeleton } from "@/components/attendance/LoadingSkeleton";
import { EmptyState } from "@/components/attendance/EmptyState";
import { motion, Variants } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import { Calendar, ChevronDown } from "lucide-react";

type StatusFilter = "all" | AttendanceStatus;
const ITEMS_PER_PAGE = 5;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

/* ─── Simple inline calendar component ─── */
function MiniCalendar({
  selectedDate,
  onSelect,
  onClose,
}: {
  selectedDate: Date;
  onSelect: (d: Date) => void;
  onClose: () => void;
}) {
  const [viewMonth, setViewMonth] = React.useState(selectedDate.getMonth());
  const [viewYear, setViewYear] = React.useState(selectedDate.getFullYear());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const today = new Date();

  const monthName = new Date(viewYear, viewMonth).toLocaleString("default", { month: "long" });

  const handlePrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const handleNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  return (
    <div className="w-[280px] bg-white rounded-2xl border border-gray-200 shadow-2xl p-4 select-none">
      {/* Month/Year header */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={handlePrevMonth} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
          <ChevronDown className="w-4 h-4 rotate-90" />
        </button>
        <span className="text-sm font-bold text-gray-800">{monthName} {viewYear}</span>
        <button onClick={handleNextMonth} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors">
          <ChevronDown className="w-4 h-4 -rotate-90" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase py-1">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {/* Empty cells for offset */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="w-full aspect-square" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isSelected =
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === viewMonth &&
            selectedDate.getFullYear() === viewYear;
          const isToday =
            today.getDate() === day &&
            today.getMonth() === viewMonth &&
            today.getFullYear() === viewYear;

          return (
            <button
              key={day}
              onClick={() => {
                onSelect(new Date(viewYear, viewMonth, day));
                onClose();
              }}
              className={`w-full aspect-square rounded-lg text-[12px] font-medium flex items-center justify-center transition-all ${
                isSelected
                  ? "bg-blue-600 text-white shadow-sm"
                  : isToday
                  ? "bg-blue-50 text-blue-600 font-bold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════ MAIN PAGE ═══════════════════════════ */

export default function AttendancePage() {
  // ── Core state ──
  const [students, setStudents] = React.useState<Student[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // ── Filter state ──
  const [searchQuery, setSearchQuery] = React.useState("");
  const [classFilter, setClassFilter] = React.useState("all");
  const [sectionFilter, setSectionFilter] = React.useState("all");
  const [selectedStatus, setSelectedStatus] = React.useState<StatusFilter>("all");

  // ── Pagination state ──
  const [currentPage, setCurrentPage] = React.useState(1);

  // ── Modal state ──
  const [editingStudent, setEditingStudent] = React.useState<Student | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  // ── Date picker state ──
  const [selectedDate, setSelectedDate] = React.useState(new Date(2025, 4, 27)); // May 27, 2025
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
  const datePickerRef = React.useRef<HTMLDivElement>(null);

  // Close date picker on outside click
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setIsDatePickerOpen(false);
      }
    }
    if (isDatePickerOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isDatePickerOpen]);

  // Simulate API loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(mockStudents);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // ── Combined filtering: search (name + roll) + class + section + status ──
  const filteredStudents = React.useMemo(() => {
    return students.filter((student) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        student.name.toLowerCase().includes(query) ||
        String(student.roll).includes(query);
      const matchesClass = classFilter === "all" || student.class === classFilter;
      const matchesSection = sectionFilter === "all" || student.section === sectionFilter;
      const matchesStatus = selectedStatus === "all" || student.status === selectedStatus;
      return matchesSearch && matchesClass && matchesSection && matchesStatus;
    });
  }, [students, searchQuery, classFilter, sectionFilter, selectedStatus]);

  // ── Pagination computation ──
  const totalStudents = filteredStudents.length;
  const totalPages = Math.max(1, Math.ceil(totalStudents / ITEMS_PER_PAGE));

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, classFilter, sectionFilter, selectedStatus]);

  // Clamp page if data shrinks
  const safePage = Math.min(currentPage, totalPages);
  if (safePage !== currentPage) {
    setCurrentPage(safePage);
  }

  const paginatedStudents = React.useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredStudents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredStudents, safePage]);

  // ── Handlers ──
  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setIsEditModalOpen(true);
  };

  const handleSaveAttendance = (studentId: number, status: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status } : s))
    );
  };

  const handleAddStudent = (data: { name: string; class: string; section: string; roll: number; status: AttendanceStatus }) => {
    const newStudent: Student = {
      id: Math.max(...students.map((s) => s.id)) + 1,
      name: data.name,
      avatar: `https://i.pravatar.cc/150?u=${data.name.replace(/\s/g, "").toLowerCase()}`,
      class: data.class,
      section: data.section,
      roll: data.roll,
      status: data.status,
      lastUpdated: "Just now",
    };
    setStudents((prev) => [newStudent, ...prev]);
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  // ── Loading state ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F7FE] flex">
        <Sidebar />
        <main className="flex-1 lg:ml-[280px] p-6 lg:p-8 pt-20 lg:pt-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-10">
              <h1 className="text-[28px] font-bold text-[#111827]">
                Welcome back, Admin! <span className="inline-block animate-wave">👋</span>
              </h1>
              <p className="text-gray-500 mt-1 text-[15px]">Here&apos;s what&apos;s happening with attendance today.</p>
            </div>
            <LoadingSkeleton />
          </div>
        </main>
      </div>
    );
  }

  // ── Main render ──
  return (
    <div className="min-h-screen bg-[#F4F7FE] flex overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 lg:ml-[280px] p-6 lg:p-8 pt-20 lg:pt-8 overflow-y-auto">
        <motion.div
          className="max-w-[1200px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── Header ── */}
          <motion.div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" variants={itemVariants}>
            <div>
              <h1 className="text-[26px] sm:text-[28px] font-bold text-[#111827] tracking-tight">
                Welcome back, Admin!{" "}
                <span className="inline-block hover:animate-waving-hand cursor-default">👋</span>
              </h1>
              <p className="text-gray-500 mt-1 text-[15px]">
                Here&apos;s what&apos;s happening with attendance today.
              </p>
            </div>

            {/* Date Picker */}
            <div className="relative" ref={datePickerRef}>
              <button
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className="flex items-center gap-2.5 bg-white border border-gray-200 text-gray-700 font-medium px-4 py-2.5 rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
              >
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{formatDate(selectedDate)}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isDatePickerOpen ? "rotate-180" : ""}`} />
              </button>

              {isDatePickerOpen && (
                <div className="absolute right-0 top-full mt-2 z-50">
                  <MiniCalendar
                    selectedDate={selectedDate}
                    onSelect={setSelectedDate}
                    onClose={() => setIsDatePickerOpen(false)}
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Summary Cards (clickable filters) ── */}
          <motion.div className="mb-6" variants={itemVariants}>
            <SummaryCards
              students={students}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
            />
          </motion.div>

          {/* ── Search & Filter Bar ── */}
          <motion.div className="mb-6" variants={itemVariants}>
            <SearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              classFilter={classFilter}
              onClassFilterChange={setClassFilter}
              sectionFilter={sectionFilter}
              onSectionFilterChange={setSectionFilter}
              onAddStudent={() => setIsAddModalOpen(true)}
            />
          </motion.div>

          {/* ── Data Table / Cards ── */}
          <motion.div variants={itemVariants} className="pb-16">
            {filteredStudents.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block">
                  <AttendanceTable
                    students={paginatedStudents}
                    onEdit={handleEdit}
                    currentPage={safePage}
                    totalPages={totalPages}
                    totalStudents={totalStudents}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                  />
                </div>

                {/* Mobile Cards — no pagination, show all matching */}
                <div className="md:hidden space-y-4">
                  {filteredStudents.map((student) => (
                    <StudentCard
                      key={student.id}
                      student={student}
                      onEdit={handleEdit}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* ── Edit Attendance Modal ── */}
          <AttendanceModal
            student={editingStudent}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveAttendance}
          />

          {/* ── Add Student Modal ── */}
          <AddStudentModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddStudent}
          />
        </motion.div>
      </main>
    </div>
  );
}