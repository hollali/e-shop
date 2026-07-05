import { groq } from "next-sanity";

export const productsQuery = groq`*[_type == "product" && defined(slug.current)] | order(_createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  comparePrice,
  "images": images[]{asset->{url}},
  sizes,
  colors,
  inStock,
  featured
}`;

export const featuredProductsQuery = groq`*[_type == "product" && featured == true && defined(slug.current)] | order(_createdAt desc) [0...8] {
  _id,
  name,
  "slug": slug.current,
  price,
  comparePrice,
  "images": images[]{asset->{url}},
  inStock
}`;

export const productsByCategoryQuery = groq`*[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id) && defined(slug.current)] | order(_createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  price,
  comparePrice,
  "images": images[]{asset->{url}},
  inStock
}`;

export const categoriesQuery = groq`*[_type == "category" && defined(slug.current)] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  "image": image.asset->url
}`;

export const allSchemasQuery = groq`{
  "products": *[_type == "product" && defined(slug.current)]{_id, name, "slug": slug.current, price, inStock},
  "categories": *[_type == "category" && defined(slug.current)]{_id, name, "slug": slug.current},
  "vendors": *[_type == "vendor"]{_id, name, "slug": slug.current},
  "banners": *[_type == "banner"]{_id, title, active, position}
}`;

export const bannersQuery = groq`*[_type == "banner" && active == true] | order(position asc) {
  _id,
  title,
  subtitle,
  "image": image.asset->url,
  link,
  position
}`;

export const vendorsQuery = groq`*[_type == "vendor" && defined(slug.current)] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  "logo": logo.asset->url,
  email,
  phone
}`;

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  comparePrice,
  "images": images[]{asset->{url}},
  "categories": categories[]->{name, "slug": slug.current},
  sizes,
  colors,
  inStock,
  featured
}`;

export const navigationQuery = groq`*[_type == "navigation"][0] {
  _id,
  topBarItems[] { title, href },
  mainNavItems[] {
    title,
    href,
    "categorySlug": category->slug.current,
    children[] { title, href }
  }
}`;
