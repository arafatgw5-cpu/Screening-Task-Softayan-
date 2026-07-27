"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  classFilter: string;
  onClassFilterChange: (value: string) => void;
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  classFilter,
  onClassFilterChange,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-1.5 rounded-2xl bg-card border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
        <Input
          placeholder="Search students by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-11 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none text-[14px] placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px bg-zinc-200/80 dark:bg-zinc-700/50 my-2" />

      {/* Class Filter */}
      <div className="flex items-center sm:w-56 px-2">
        <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground/60 mr-2 shrink-0" />
        <Select value={classFilter} onValueChange={onClassFilterChange}>
          <SelectTrigger className="h-10 border-0 bg-transparent shadow-none focus:ring-0 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 rounded-lg transition-colors text-[14px] font-medium">
            <SelectValue placeholder="Filter by class" />
          </SelectTrigger>
          <SelectContent
            align="end"
            className="rounded-xl shadow-xl border-zinc-200/80 dark:border-zinc-700/60"
          >
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="8">Class 8</SelectItem>
            <SelectItem value="9">Class 9</SelectItem>
            <SelectItem value="10">Class 10</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}