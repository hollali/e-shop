"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { PAYSTACK_PUBLIC_KEY } from "@/lib/constants";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "Ghana",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaystackPayment = () => {
    const handler = new window.PaystackPop();

    handler.newTransaction({
      key: PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: getTotal() * 100,
      currency: "GHS",
      ref: `ESHOP-${Date.now()}`,
      metadata: {
        custom_fields: [
          { display_name: "Full Name", variable_name: "full_name", value: form.fullName },
          { display_name: "Phone", variable_name: "phone", value: form.phone },
        ],
      },
      onSuccess: (transaction: any) => {
        clearCart();
        router.push(`/order/success?ref=${transaction.reference}`);
      },
      onCancel: () => {
        setLoading(false);
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!PAYSTACK_PUBLIC_KEY) {
      alert("Paystack is not configured. Please set NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in your .env file.");
      setLoading(false);
      return;
    }

    handlePaystackPayment();
  };

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4">Shipping Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Phone"
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Street Address"
                    id="street"
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="City"
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="State"
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Country"
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-gray-600 line-clamp-1">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatPrice(Number(item.product.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                  <hr />
                  <div className="flex justify-between text-base">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary">
                      {formatPrice(getTotal())}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-md p-3 mb-4">
                  <p className="text-xs text-gray-500 text-center">
                    Pay securely with Paystack. We accept Visa, Mastercard, and
                    Mobile Money.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Processing..." : `Pay ${formatPrice(getTotal())}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
