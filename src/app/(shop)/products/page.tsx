import { client } from "@/sanity/lib/client";
import { productsQuery, categoriesQuery } from "@/sanity/lib/queries";
import { ProductsPageClient } from "./page-client";

export const revalidate = 30;

export default async function ProductsPage() {
  let products: any[] = [];
  try { products = await client.fetch(productsQuery); } catch (_) {}

  let categories: any[] = [];
  try { categories = await client.fetch(categoriesQuery); } catch (_) {}

  return <ProductsPageClient products={products} categories={categories} />;
}