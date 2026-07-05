"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SubCategory {
  name: string;
  href: string;
}

const MEGA_MENUS: Record<string, SubCategory[]> = {
  MEN: [
    { name: "ACCESSORIES", href: "/products?category=accessories" },
    { name: "CLOTHING", href: "/products?category=clothing" },
    { name: "FOOTWEAR", href: "/products?category=footwear" },
  ],
  WOMEN: [
    { name: "ACCESSORIES", href: "/products?category=accessories" },
    { name: "CLOTHING", href: "/products?category=clothing" },
    { name: "FOOTWEAR", href: "/products?category=footwear" },
    { name: "SKIRTS", href: "/products?category=skirts" },
  ],
  BRANDS: [
    { name: "NIKE", href: "/products?brand=nike" },
    { name: "ADIDAS", href: "/products?brand=adidas" },
    { name: "BIRKENSTOCK", href: "/products?brand=birkenstock" },
    { name: "CROCS", href: "/products?brand=crocs" },
    { name: "BURBERRY", href: "/products?brand=burberry" },
  ],
};

export function MainNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="border-b border-gray-200 bg-white hidden lg:block">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center">
          {NAV_CATEGORIES.map((cat) => {
            const hasSub = MEGA_MENUS[cat.name];
            return (
              <div
                key={cat.name}
                className="relative"
                onMouseEnter={() => setActiveMenu(cat.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={cat.href}
                  className={cn(
                    "inline-flex items-center h-12 px-4 text-sm font-semibold uppercase tracking-wide text-gray-800 hover:text-primary border-b-2 border-transparent hover:border-primary transition-all",
                    activeMenu === cat.name && "text-primary border-primary"
                  )}
                >
                  {cat.name}
                </Link>
                {hasSub && activeMenu === cat.name && (
                  <div className="absolute top-full left-0 w-[600px] bg-white border border-gray-200 shadow-lg z-50 p-6">
                    <div className="grid grid-cols-3 gap-6">
                      {hasSub.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block text-sm text-gray-700 hover:text-primary py-1.5 font-medium"
                        >
                          {sub.name}
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
