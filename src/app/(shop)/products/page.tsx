import { client } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";
import { ProductsPageClient } from "./page-client";

export default async function ProductsPage() {
  let products: any[] = [];
  try { products = await client.fetch(productsQuery); } catch (_) {}

  return <ProductsPageClient products={products} />;
}