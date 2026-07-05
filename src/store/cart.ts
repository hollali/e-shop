import { create } from "zustand";

interface CartProduct {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  comparePrice?: number | string | null;
  images?: string[] | { asset?: { url?: string } }[];
  inStock?: boolean;
}

interface CartItem {
  id: string;
  productId: string;
  product: CartProduct;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartStore {
  items: CartItem[];
  loaded: boolean;
  loadCart: (items: CartItem[]) => void;
  addItem: (product: CartProduct, quantity?: number, size?: string, color?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

let persistTimeout: ReturnType<typeof setTimeout> | null = null;

function persistCart(items: CartItem[]) {
  if (persistTimeout) clearTimeout(persistTimeout);
  persistTimeout = setTimeout(async () => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
    } catch {}
  }, 500);
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  loaded: false,

  loadCart: (items) => set({ items, loaded: true }),

  addItem: (product, quantity = 1, size?, color?) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.productId === product.id && item.size === size && item.color === color
      );

      let items: CartItem[];
      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex].quantity += quantity;
        items = updated;
      } else {
        items = [
          ...state.items,
          {
            id: crypto.randomUUID(),
            productId: product.id,
            product,
            quantity,
            size,
            color,
          },
        ];
      }

      persistCart(items);
      return { items };
    });
  },

  removeItem: (id) => {
    set((state) => {
      const items = state.items.filter((item) => item.id !== id);
      persistCart(items);
      return { items };
    });
  },

  updateQuantity: (id, quantity) => {
    set((state) => {
      const items = state.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      persistCart(items);
      return { items };
    });
  },

  clearCart: () => {
    set({ items: [] });
    persistCart([]);
  },

  getTotal: () => {
    return get().items.reduce((total, item) => {
      const price = parseFloat(String(item.product.price));
      return total + price * item.quantity;
    }, 0);
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));
