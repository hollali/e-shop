import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { categoriesQuery } from "@/sanity/lib/queries";

export async function CategoriesSection() {
  const categories = await client.fetch(categoriesQuery);

  if (categories.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat: any) => (
            <Link
              key={cat._id}
              href={`/categories/${cat.slug}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/5]"
            >
              <img
                src={cat.image || "https://via.placeholder.com/400x500/333/ffffff?text=Category"}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl font-bold tracking-widest">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
