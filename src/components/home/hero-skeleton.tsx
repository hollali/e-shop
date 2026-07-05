import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <div className="relative overflow-hidden bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center py-32 md:py-44 lg:py-56">
          <Skeleton className="h-12 md:h-16 lg:h-20 w-3/4 max-w-lg mb-4" />
          <Skeleton className="h-6 w-2/4 max-w-sm mb-8" />
          <Skeleton className="h-12 w-36 rounded-md" />
        </div>
      </div>
    </div>
  );
}
