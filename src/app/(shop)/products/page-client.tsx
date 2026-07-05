"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/product/product-grid";
import { Input } from "@/components/ui/input";

export function ProductsPageClient({ products }: { products: any[] }) {
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) && p.inStock !== false
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <h2 className="text-lg font-bold mb-4">Filters</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Category
              </h3>
              <div className="space-y-2">
                {["All", "Men", "Women", "Accessories", "Brands"].map(
                  (cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="category"
                        defaultChecked={cat === "All"}
                        className="text-primary focus:ring-primary"
                      />
                      {cat}
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              Showing {filtered.length} products
            </p>
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Sort by: Latest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A-Z</option>
            </select>
          </div>
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}