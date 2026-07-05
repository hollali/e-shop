"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  children?: { title: string; href: string }[];
}

export function MainNav({ items }: { items: NavItem[] }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="border-b border-gray-200 bg-white hidden lg:block">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center">
          {items.map((item) => {
            const hasSub = item.children && item.children.length > 0;
            return (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setActiveMenu(item.title)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center h-12 px-4 text-sm font-semibold uppercase tracking-wide text-gray-800 hover:text-primary border-b-2 border-transparent hover:border-primary transition-all",
                    activeMenu === item.title && "text-primary border-primary"
                  )}
                >
                  {item.title}
                </Link>
                {hasSub && activeMenu === item.title && (
                  <div className="absolute top-full left-0 w-[600px] bg-white border border-gray-200 shadow-lg z-50 p-6">
                    <div className="grid grid-cols-3 gap-6">
                      {item.children!.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          className="block text-sm text-gray-700 hover:text-primary py-1.5 font-medium"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
