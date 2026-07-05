"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";

export default function WishlistPage() {
  const { userId } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/wishlist");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  const removeItem = async (productId: string) => {
    await fetch(`/api/wishlist?productId=${productId}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
              <Skeleton className="w-20 h-20 rounded-md shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Heart size={48} className="mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Wishlist</h1>
        <p className="text-gray-500 mb-6">Sign in to save your favourite items.</p>
        <Link href="/auth/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Heart size={48} className="mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
        <p className="text-gray-500 mb-6">Save items you love by tapping the heart icon.</p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Wishlist ({items.length})</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
          >
            <Link href={`/product/${item.productSlug}`} className="shrink-0">
              <img
                src={item.productImage || "https://via.placeholder.com/100"}
                alt={item.productName}
                loading="lazy"
                className="w-20 h-20 object-cover rounded-md"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link
                href={`/product/${item.productSlug}`}
                className="text-sm font-medium text-gray-900 hover:text-primary line-clamp-1"
              >
                {item.productName}
              </Link>
              <p className="text-sm font-bold text-primary mt-1">
                {formatPrice(parseFloat(item.productPrice || "0"))}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/product/${item.productSlug}`}>
                <Button size="sm" variant="outline">
                  <ShoppingBag size={16} />
                </Button>
              </Link>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeItem(item.productId)}
              >
                <Trash2 size={16} className="text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
