export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {/* Summary cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-card p-6 shadow-sm animate-pulse"
          >
            <div className="h-4 bg-muted rounded w-1/3 mb-2" />
            <div className="h-8 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>

      {/* Filters skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="h-10 bg-muted rounded-lg w-full sm:w-64 animate-pulse" />
        <div className="h-10 bg-muted rounded-lg w-full sm:w-48 animate-pulse" />
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="p-4 border-b">
          <div className="h-6 bg-muted rounded w-1/4 animate-pulse" />
        </div>
        <div className="p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="h-10 w-10 bg-muted rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/4" />
                <div className="h-3 bg-muted rounded w-1/6" />
              </div>
              <div className="h-6 bg-muted rounded w-16" />
              <div className="h-9 bg-muted rounded w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}