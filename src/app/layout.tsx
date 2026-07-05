import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { SanityLive } from "@/sanity/lib/live";
import { CartLoader } from "@/components/cart/cart-loader";
import { client } from "@/sanity/lib/client";
import { navigationQuery, categoriesQuery } from "@/sanity/lib/queries";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `Home - ${SITE_NAME}® | Leading Online Fashion Store in Africa.`,
    template: `%s - ${SITE_NAME}®`,
  },
  description: SITE_DESCRIPTION,
  keywords:
    "fashion, clothing, outfits, best shopping site, africa, startup, online store",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let navData: any = null;
  try { navData = await client.fetch(navigationQuery); } catch (_) {}

  const topBarItems = navData?.topBarItems?.length
    ? navData.topBarItems
    : [
        { title: "Contact", href: "/contact" },
        { title: "Products", href: "/products" },
        { title: "Style Gallery", href: "/style-gallery" },
        { title: "About", href: "/about" },
      ];

  let mainNavItems = navData?.mainNavItems?.length
    ? navData.mainNavItems.map((item: any) => ({
        ...item,
        href: item.categorySlug ? `/categories/${item.categorySlug}` : item.href || "#",
      }))
    : null;

  if (!mainNavItems) {
    try {
      const categories: any[] = await client.fetch(categoriesQuery);
      mainNavItems = categories.map((cat: any) => ({
        title: cat.name.toUpperCase(),
        href: `/categories/${cat.slug}`,
      }));
    } catch (_) {
      mainNavItems = [
        { title: "MEN", href: "/products?category=men" },
        { title: "WOMEN", href: "/products?category=women" },
        { title: "BRANDS", href: "/products?category=brands" },
        { title: "DISCOUNT", href: "/products?discount=true" },
        { title: "UNISEX", href: "/products?category=unisex" },
      ];
    }
  }

  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <Header topBarItems={topBarItems} mainNavItems={mainNavItems} />
          <main className="flex-1">{children}</main>
          <Footer />
          <SanityLive />
          <CartLoader />
        </body>
      </html>
    </ClerkProvider>
  );
}
