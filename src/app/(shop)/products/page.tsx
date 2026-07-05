"use client";

import { useState, useEffect } from "react";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductGridSkeleton } from "@/components/product/product-card-skeleton";
import { Input } from "@/components/ui/input";
import { client } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    client.fetch(productsQuery).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) && p.inStock !== false
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 animate-pulse rounded-md" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-5 bg-gray-200 animate-pulse rounded w-24" />
                ))}
              </div>
            </div>
          </aside>
          <div className="flex-1">
            <ProductGridSkeleton count={12} />
          </div>
        </div>
      </div>
    );
  }

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
