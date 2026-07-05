import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { SanityLive } from "@/sanity/lib/live";
import { CartLoader } from "@/components/cart/cart-loader";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <SanityLive />
          <CartLoader />
        </body>
      </html>
    </ClerkProvider>
  );
}
