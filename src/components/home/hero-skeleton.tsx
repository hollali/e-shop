import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <div className="bg-gray-100 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center py-24 md:py-32">
          <Skeleton className="h-16 md:h-24 w-3/4 max-w-lg mb-4" />
          <Skeleton className="h-6 w-2/4 max-w-sm mb-8" />
          <Skeleton className="h-12 w-36 rounded-md" />
        </div>
      </div>
    </div>
  );
}
