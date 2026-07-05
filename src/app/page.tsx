import { Hero } from "@/components/home/hero";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Newsletter } from "@/components/home/newsletter";
import { client } from "@/sanity/lib/client";
import { bannersQuery } from "@/sanity/lib/queries";

export const revalidate = 30;

export default async function HomePage() {
  let banners: any[] = [];
  try { banners = await client.fetch(bannersQuery); } catch (_) {}

  return (
    <>
      <Hero banners={banners} />
      <CategoriesSection />
      <FeaturedProducts />
      <Newsletter />
    </>
  );
}
