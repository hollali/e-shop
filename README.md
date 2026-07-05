# StyleHive

Leading Online Fashion Store in Africa. Built with Next.js 15, Sanity CMS, NeonDB (PostgreSQL), Clerk Auth, and Paystack Payments.

## Tech Stack

| Layer            | Technology                                      |
| ---------------- | ----------------------------------------------- |
| **Framework**    | Next.js 15 (App Router, React 19, TypeScript 6) |
| **CMS**          | Sanity (GROQ, Live Preview, Studio at `/studio`)          |
| **Database**     | NeonDB (PostgreSQL) + Drizzle ORM                          |
| **Auth**         | Clerk (auth, session management, webhooks)                 |
| **Payments**     | Paystack (cards, mobile money, GHS)                        |
| **Styling**      | Tailwind CSS 3, Lucide React icons                         |
| **State**        | Zustand (cart store with DB persistence)                   |

## Features

- **Authentication** – Clerk-powered login/register with role-based access (customer, vendor, admin)
- **Product Catalog** – Managed via Sanity CMS with categories, sizes, colors, discounts, and featured flags
- **Shopping Cart** – Zustand store auto-persisted to NeonDB (debounced sync, loaded on auth)
- **Wishlist** – Add/remove products, dedicated wishlist page
- **Checkout & Payments** – Paystack integration with shipping form and payment verification
- **Vendor Dashboard** – Protected dashboard with overview, products, orders, and settings tabs
- **Sanity Studio** – Headless CMS at `/studio` for managing products, categories, banners, and vendors
- **Responsive Design** – Mobile hamburger menu, adaptive grid layouts, sticky header
- **Product Search & Filter** – Client-side search with category filters and sort options
- **Hero Banners** – Sanity-powered carousel with auto-rotation

## Project Structure

```
src/
├── app/                     # Next.js App Router pages & API routes
│   ├── (shop)/              # Cart, checkout, products, wishlist, shops
│   ├── account/             # User account hub
│   ├── api/                 # REST endpoints (cart, wishlist, checkout, webhooks, auth)
│   ├── auth/                # Clerk login/register pages
│   ├── dashboard/           # Vendor dashboard (protected)
│   ├── studio/              # Sanity Studio mount
│   └── layout.tsx           # Root layout (ClerkProvider, Header, Footer)
├── components/              # React components
│   ├── layout/              # Header, TopBar, MainNav, Footer
│   ├── home/                # Hero, FeaturedProducts, CategoriesSection, Newsletter
│   ├── product/             # ProductCard, ProductGrid
│   ├── cart/                # CartLoader
│   └── ui/                  # Button, Card, Badge, Input, Skeleton
├── lib/
│   ├── db/                  # Drizzle schema + NeonDB connection
│   ├── auth.ts              # Clerk auth helpers
│   ├── constants.ts         # Site config, nav links
│   ├── paystack.ts          # Payment helpers
│   └── utils.ts             # cn(), formatPrice, slugify
├── sanity/                  # Sanity CMS config
│   ├── schemas/             # Document types: product, category, banner, vendor
│   ├── lib/                 # Client, queries (GROQ), live preview, image URLs
│   └── env.ts               # Sanity env vars
├── store/                   # Zustand cart store
├── types/                   # TypeScript interfaces
└── middleware.ts             # Clerk route protection
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (Neon recommended)
- Clerk account (for auth)
- Sanity account (for CMS)
- Paystack account (for payments)

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# NeonDB
DATABASE_URL=

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Clerk Webhook
CLERK_WEBHOOK_SECRET=

# Paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Database Migrations

```bash
npm run db:generate   # Generate migration files
npm run db:migrate    # Apply migrations
npm run db:push       # Push schema directly (dev only)
npm run db:studio     # Open Drizzle Studio
```

### Sanity Studio

Run the dev server, then visit `/studio` to access the Sanity CMS.

You can also run the Sanity Studio standalone:

```bash
npm run sanity:dev
```

## Scripts

| Script          | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start Next.js dev server   |
| `npm run build` | Production build           |
| `npm run start` | Start production server    |
| `npm run lint`  | Run ESLint                 |
| `npm run sanity:dev`  | Standalone Sanity Studio   |
| `npm run db:push`     | Push Drizzle schema        |
| `npm run db:generate` | Generate Drizzle migration |
| `npm run db:migrate`  | Apply Drizzle migration    |
| `npm run db:studio`   | Open Drizzle Studio        |

## Architecture

- **Content** (products, categories, banners, vendors) is managed in **Sanity CMS** and fetched at build/request time via GROQ queries.
- **Transactional data** (users, orders, carts, wishlists, reviews) lives in **NeonDB (PostgreSQL)** accessed through **Drizzle ORM**.
- **Authentication** is handled by **Clerk**, which syncs user data to NeonDB via webhooks.
- **Payments** are processed client-side with **Paystack Popup**, verified server-side via the Paystack API.
- The **cart** uses a hybrid approach: a Zustand store for instant UI updates, debounce-persisted to the database for cross-device continuity.
