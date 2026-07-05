"use client";

import { ProductGrid } from "@/components/product/product-grid";

export function CategoryPageClient({ products, slug }: { products: any[]; slug: string }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 capitalize mb-8">
        {slug.replace(/-/g, " ")}
      </h1>
      <ProductGrid products={products} />
    </div>
  );
}