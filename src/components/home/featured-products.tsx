import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { client } from "@/sanity/lib/client";
import { featuredProductsQuery } from "@/sanity/lib/queries";

export async function FeaturedProducts() {
  let products: any[] = [];
  try { products = await client.fetch(featuredProductsQuery); } catch (_) {}


  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-primary hover:text-primary-600 transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
