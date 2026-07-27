"use client";

import React from "react";
import { Student, AttendanceStatus } from "@/types/student";
import { mockStudents } from "@/data/students";
import { SummaryCards } from "@/components/attendance/SummaryCards";
import { SearchFilter } from "@/components/attendance/SearchFilter";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { StudentCard } from "@/components/attendance/StudentCard";
import { AttendanceModal } from "@/components/attendance/AttendanceModal";
import { LoadingSkeleton } from "@/components/attendance/LoadingSkeleton";
import { EmptyState } from "@/components/attendance/EmptyState";
import { motion, Variants } from "framer-motion";

type StatusFilter = "all" | AttendanceStatus;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function AttendancePage() {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [classFilter, setClassFilter] = React.useState("all");
  const [selectedStatus, setSelectedStatus] = React.useState<StatusFilter>("all");
  const [editingStudent, setEditingStudent] = React.useState<Student | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Simulate API loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(mockStudents);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Combined filtering: search + class dropdown + status card
  const filteredStudents = React.useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = student.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesClass =
        classFilter === "all" || student.class === classFilter;
      const matchesStatus =
        selectedStatus === "all" || student.status === selectedStatus;
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [students, searchQuery, classFilter, selectedStatus]);

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleSaveAttendance = (studentId: number, status: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const handleStatusFilterChange = (status: StatusFilter) => {
    setSelectedStatus(status);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Student Attendance
            </h1>
            <p className="text-muted-foreground mt-1.5 text-[15px]">
              Manage and track student attendance records
            </p>
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 overflow-hidden">
      <motion.div
        className="mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-10" variants={itemVariants}>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Student Attendance
              </h1>
              <p className="text-muted-foreground mt-1.5 text-[15px]">
                Manage and track student attendance records
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-muted-foreground bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/40 rounded-full px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </motion.div>

        {/* Summary Cards — Clickable Filters */}
        <motion.div className="mb-10" variants={itemVariants}>
          <SummaryCards
            students={students}
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusFilterChange}
          />
        </motion.div>

        {/* Search & Filter */}
        <motion.div className="mb-8" variants={itemVariants}>
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            classFilter={classFilter}
            onClassFilterChange={setClassFilter}
          />
        </motion.div>

        {/* Attendance List */}
        <motion.div variants={itemVariants} className="pb-16">
          {filteredStudents.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <AttendanceTable
                  students={filteredStudents}
                  onEdit={handleEdit}
                />
              </div>

              {/* Mobile Cards */}
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

        {/* Edit Modal */}
        <AttendanceModal
          student={editingStudent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveAttendance}
        />
      </motion.div>
    </div>
  );
}