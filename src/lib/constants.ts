export const NAV_CATEGORIES = [
  { name: "MEN", href: "/products?category=men" },
  { name: "WOMEN", href: "/products?category=women" },
  { name: "BRANDS", href: "/products?category=brands" },
  { name: "DISCOUNT", href: "/products?discount=true" },
  { name: "UNISEX", href: "/products?category=unisex" },
];

export const TOP_BAR_LINKS = [
  { name: "Contact", href: "/contact" },
  { name: "Products", href: "/products" },
  { name: "Style Gallery", href: "/style-gallery" },
  { name: "About", href: "/about" },
];

export const PAYSTACK_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

export const SITE_NAME = "StyleHive";
export const SITE_DESCRIPTION =
  "Leading Online Fashion Store in Africa. Shop for shoes, clothing, jewellery, dresses and more from top brands and local stores.";
