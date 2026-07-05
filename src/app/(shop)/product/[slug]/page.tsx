import { client } from "@/sanity/lib/client";
import { productBySlugQuery } from "@/sanity/lib/queries";
import { ProductDetailClient } from "./page-client";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product: any = null;
  try { product = await client.fetch(productBySlugQuery, { slug }); } catch (_) {}

  return <ProductDetailClient product={product} slug={slug} />;
}