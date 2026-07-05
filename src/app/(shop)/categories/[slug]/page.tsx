import { client } from "@/sanity/lib/client";
import { productsByCategoryQuery } from "@/sanity/lib/queries";
import { CategoryPageClient } from "./page-client";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let products: any[] = [];
  try { products = await client.fetch(productsByCategoryQuery, { slug }); } catch (_) {}

  return <CategoryPageClient products={products} slug={slug} />;
}