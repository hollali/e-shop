"use client";

import Link from "next/link";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Your Cart is Empty
        </h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link href="/products">
          <Button>
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex gap-4 p-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                  <img
                    src={
                      typeof item.product.images?.[0] === "string"
                        ? item.product.images[0]
                        : (item.product.images?.[0] as any)?.asset?.url ||
                          "https://via.placeholder.com/96x96/eee/999?text=P"
                    }
                    alt={item.product.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="text-sm font-medium text-gray-900 hover:text-primary line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.size && `Size: ${item.size}`}
                    {item.color && ` | Color: ${item.color}`}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="h-8 w-8 flex items-center justify-center border border-gray-300 rounded-md text-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-8 w-8 flex items-center justify-center border border-gray-300 rounded-md text-sm"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-primary">
                        {formatPrice(
                          Number(item.product.price) * item.quantity
                        )}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Items ({getItemCount()})
                  </span>
                  <span className="font-medium">
                    {formatPrice(getTotal())}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <hr />
                <div className="flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary">
                    {formatPrice(getTotal())}
                  </span>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full mt-6" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link
                href="/products"
                className="block text-center text-sm text-primary hover:text-primary-600 mt-4"
              >
                Continue Shopping
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
