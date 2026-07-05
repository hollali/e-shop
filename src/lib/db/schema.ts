import {
  pgTable,
  text,
  timestamp,
  integer,
  decimal,
  boolean,
  uuid,
  json,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  role: text("role", { enum: ["customer", "vendor", "admin"] })
    .notNull()
    .default("customer"),
  avatar: text("avatar"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const shops = pgTable("shops", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  logo: text("logo"),
  coverImage: text("cover_image"),
  vendorId: text("vendor_id")
    .notNull()
    .references(() => users.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
  parentId: uuid("parent_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  comparePrice: decimal("compare_price", { precision: 10, scale: 2 }),
  images: json("images").$type<string[]>().default([]).notNull(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id),
  shopId: uuid("shop_id")
    .notNull()
    .references(() => shops.id),
  sizes: json("sizes").$type<string[]>().default([]),
  colors: json("colors").$type<string[]>().default([]),
  inStock: boolean("in_stock").default(true),
  quantity: integer("quantity").default(0),
  isFeatured: boolean("is_featured").default(false),
  tags: json("tags").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  items: json("items").$type<any[]>().notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status", {
    enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
  })
    .notNull()
    .default("pending"),
  shippingAddress: json("shipping_address").$type<any>().notNull(),
  paymentMethod: text("payment_method").notNull(),
  paymentRef: text("payment_ref"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const wishlists = pgTable("wishlists", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  productId: text("product_id").notNull(),
  productName: text("product_name"),
  productSlug: text("product_slug"),
  productPrice: decimal("product_price", { precision: 10, scale: 2 }),
  productImage: text("product_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const carts = pgTable("carts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  items: json("items").$type<any[]>().default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
