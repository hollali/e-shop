"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice, cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

interface ProductCardProps {
  product: {
    _id?: string;
    id?: string;
    name: string;
    slug: string;
    price: number | string;
    comparePrice?: number | string | null;
    images?: { asset?: { url?: string } }[] | string[];
    inStock?: boolean;
  };
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { userId } = useAuth();
  const [wishlisted, setWishlisted] = useState(false);

  const imageUrl = Array.isArray(product.images)
    ? typeof product.images[0] === "string"
      ? product.images[0]
      : (product.images[0] as any)?.asset?.url ||
        "https://via.placeholder.com/300x400/eee/999?text=Product"
    : "https://via.placeholder.com/300x400/eee/999?text=Product";

  const price = Number(product.price);
  const comparePrice = product.comparePrice ? Number(product.comparePrice) : null;
  const hasDiscount = comparePrice && comparePrice > price;
  const productId = product._id || product.id || product.slug;

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!userId) return;
    try {
      if (wishlisted) {
        await fetch(`/api/wishlist?productId=${productId}`, { method: "DELETE" });
        setWishlisted(false);
      } else {
        await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId,
            productName: product.name,
            productSlug: product.slug,
            productPrice: price,
            productImage: imageUrl,
          }),
        });
        setWishlisted(true);
      }
    } catch {}
  };

  return (
    <div className={cn("group", className)}>
      <Link
        href={`/product/${product.slug}`}
        className="block relative overflow-hidden rounded-lg bg-gray-50 aspect-[3/4] mb-3"
      >
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && (
            <Badge variant="sale">
              -{Math.round(((comparePrice - price) / comparePrice) * 100)}%
            </Badge>
          )}
        </div>
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <Heart
            size={16}
            className={wishlisted ? "text-red-500 fill-red-500" : "text-gray-600"}
          />
        </button>
      </Link>
      <Link href={`/product/${product.slug}`}>
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-bold text-primary">
            {formatPrice(price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(comparePrice)}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
