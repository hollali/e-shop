"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Successful!
        </h1>
        <p className="text-gray-500 mb-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        {ref && (
          <p className="text-sm text-gray-400 mb-8">
            Reference: <span className="font-mono">{ref}</span>
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <Link href="/products">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Link href="/account/orders">
            <Button>View Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
