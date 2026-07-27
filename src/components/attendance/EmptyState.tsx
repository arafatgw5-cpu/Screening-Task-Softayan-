import { SearchX } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/50 p-5 ring-1 ring-zinc-200/60 dark:ring-zinc-700/40">
        <SearchX className="h-7 w-7 text-muted-foreground/60" />
      </div>
      <h3 className="text-base font-semibold text-foreground">
        No students found
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs mt-1.5 leading-relaxed">
        Try adjusting your search or filter criteria to find the students
        you&apos;re looking for.
      </p>
    </div>
  );
}