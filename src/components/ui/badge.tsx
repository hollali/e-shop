import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sale" | "outline" | "success";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium",
        {
          "bg-primary text-white": variant === "default",
          "bg-red-500 text-white": variant === "sale",
          "border border-gray-300 text-gray-700": variant === "outline",
          "bg-green-500 text-white": variant === "success",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
