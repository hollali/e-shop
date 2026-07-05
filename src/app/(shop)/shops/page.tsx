import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const shops = [
  { id: "1", name: "Fashion Hub", slug: "fashion-hub", products: 45, rating: 4.5 },
  { id: "2", name: "Street Wear Co", slug: "street-wear-co", products: 28, rating: 4.2 },
  { id: "3", name: "Luxury Boutique", slug: "luxury-boutique", products: 62, rating: 4.8 },
  { id: "4", name: "Afro Trends", slug: "afro-trends", products: 33, rating: 4.0 },
];

export default function ShopsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Our Vendors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <Link key={shop.id} href={`/shop/${shop.slug}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-primary">
                    {shop.name[0]}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{shop.name}</h3>
                <p className="text-sm text-gray-500">
                  {shop.products} products &middot; {shop.rating} ★
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
