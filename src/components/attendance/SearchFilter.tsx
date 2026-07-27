"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, GraduationCap, Users, Plus } from "lucide-react";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  classFilter: string;
  onClassFilterChange: (value: string) => void;
  sectionFilter: string;
  onSectionFilterChange: (value: string) => void;
  onAddStudent: () => void;
}

/**
 * SearchFilter — Filter bar with Class, Section dropdowns, search input, and "+ Add Student" button.
 * Search supports student name and roll number matching.
 */
export function SearchFilter({
  searchQuery,
  onSearchChange,
  classFilter,
  onClassFilterChange,
  sectionFilter,
  onSectionFilterChange,
  onAddStudent,
}: SearchFilterProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-end gap-4">
      {/* Class Filter */}
      <div className="w-full md:w-[200px]">
        <label className="block text-[11px] font-bold text-gray-900 mb-2 uppercase tracking-wide">
          Class
        </label>
        <Select value={classFilter} onValueChange={onClassFilterChange}>
          <SelectTrigger className="w-full h-11 bg-white border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 shadow-sm text-[13px] font-medium text-gray-700">
            <div className="flex items-center">
              <GraduationCap className="w-4 h-4 mr-2 text-gray-500 shrink-0" />
              <SelectValue placeholder="All Classes" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="10-A">Class 10-A</SelectItem>
            <SelectItem value="10-B">Class 10-B</SelectItem>
            <SelectItem value="11-A">Class 11-A</SelectItem>
            <SelectItem value="9-A">Class 9-A</SelectItem>
            <SelectItem value="9-B">Class 9-B</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Section Filter */}
      <div className="w-full md:w-[200px]">
        <label className="block text-[11px] font-bold text-gray-900 mb-2 uppercase tracking-wide">
          Section
        </label>
        <Select value={sectionFilter} onValueChange={onSectionFilterChange}>
          <SelectTrigger className="w-full h-11 bg-white border border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 shadow-sm text-[13px] font-medium text-gray-700">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-gray-500 shrink-0" />
              <SelectValue placeholder="All Sections" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">All Sections</SelectItem>
            <SelectItem value="A">Section A</SelectItem>
            <SelectItem value="B">Section B</SelectItem>
            <SelectItem value="C">Section C</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search Input — searches by name AND roll number */}
      <div className="flex-1 w-full relative">
        <label className="block text-[11px] font-bold text-gray-900 mb-2 uppercase tracking-wide">
          Search Student
        </label>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name or roll..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-11 bg-white border border-gray-200 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500 shadow-sm text-[13px] placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* + Add Student Button */}
      <button
        onClick={onAddStudent}
        className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-blue-600 text-white font-semibold text-[13px] shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all"
      >
        <Plus className="w-4 h-4" />
        Add Student
      </button>
    </div>
  );
}