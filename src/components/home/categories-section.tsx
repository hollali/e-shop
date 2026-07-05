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
        <div className="flex flex-wrap justify-center gap-12">
          {categories.map((cat: any) => (
            <Link
              key={cat._id}
              href={`/categories/${cat.slug}`}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-primary transition-colors">
                <img
                  src={cat.image || "https://via.placeholder.com/200x200/eee/999?text=Category"}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
