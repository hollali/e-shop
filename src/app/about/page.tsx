import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { Sparkles, Shield, Truck, RefreshCw, Store, HeartHandshake } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Quality First",
    description: "We handpick every item to ensure premium quality and authentic products from trusted brands.",
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description: "Your privacy and security matter. Shop with confidence using encrypted payments via Paystack.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "We partner with reliable logistics providers to get your orders to you quickly across Africa.",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Not satisfied? We offer hassle-free returns within 14 days of delivery.",
  },
  {
    icon: Store,
    title: "Support Local",
    description: "We empower African brands and vendors by bringing their products to a wider audience.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description: "Our support team is always ready to help with anything you need.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          About {SITE_NAME}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {SITE_DESCRIPTION}
        </p>
      </section>

      {/* Story */}
      <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              {SITE_NAME} was founded with a simple mission: to make fashion accessible
              to everyone in Africa. We saw a gap between the quality and variety
              available globally and what was accessible locally.
            </p>
            <p>
              We connect shoppers with the best local and international brands,
              offering everything from casual wear to formal attire, accessories,
              footwear, and jewellery — all in one place.
            </p>
            <p>
              Today we partner with hundreds of vendors across the continent and
              serve thousands of happy customers who trust us for their fashion needs.
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <p className="text-6xl font-bold text-primary mb-2">2024</p>
            <p className="text-gray-500 font-medium">Founded</p>
            <p className="text-6xl font-bold text-primary mt-8 mb-2">1K+</p>
            <p className="text-gray-500 font-medium">Happy Customers</p>
            <p className="text-6xl font-bold text-primary mt-8 mb-2">100+</p>
            <p className="text-gray-500 font-medium">Brand Partners</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          What We Stand For
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="p-6 rounded-xl border border-gray-200 hover:border-primary/20 hover:shadow-md transition-all">
              <v.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Upgrade Your Wardrobe?
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Browse our latest collections and find your next favorite outfit.
        </p>
        <Link href="/products">
          <Button>Shop Now</Button>
        </Link>
      </section>
    </div>
  );
}
