"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useCart } from "@/store/cart";

export function CartLoader() {
  const { userId, isLoaded } = useAuth();
  const loadCart = useCart((s) => s.loadCart);

  useEffect(() => {
    if (!isLoaded || !userId) return;
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => {
        if (data?.items) loadCart(data.items);
      })
      .catch(() => {});
  }, [userId, isLoaded, loadCart]);

  return null;
}
