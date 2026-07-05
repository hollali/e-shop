"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductGridSkeleton } from "@/components/product/product-card-skeleton";
import { client } from "@/sanity/lib/client";
import { productsByCategoryQuery } from "@/sanity/lib/queries";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    client.fetch(productsByCategoryQuery, { slug }).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 capitalize mb-8">
        {slug.replace(/-/g, " ")}
      </h1>
      {loading ? (
        <ProductGridSkeleton count={8} />
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
