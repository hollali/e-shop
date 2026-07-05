"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatPrice, truncate } from "@/lib/utils";
import {
  Package, ShoppingBag, Users, TrendingUp, Plus,
  Edit3, Trash2, Eye, Loader2
} from "lucide-react";
import Link from "next/link";

type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

interface DashboardData {
  shop: {
    id: string;
    name: string;
    description: string | null;
    slug: string;
    logo: string | null;
  } | null;
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalCustomers: number;
    revenue: number;
  };
  productsList: Array<{
    id: string;
    name: string;
    slug: string;
    price: string;
    comparePrice: string | null;
    images: string[];
    inStock: boolean;
    quantity: number;
    isFeatured: boolean;
    createdAt: string;
  }>;
  ordersList: Array<{
    id: string;
    userId: string;
    items: Array<{ productId: string; productName: string; price: number; quantity: number; shopId: string }>;
    total: string;
    status: OrderStatus;
    shippingAddress: { fullName: string; phone: string };
    paymentMethod: string;
    paymentRef: string | null;
    createdAt: string;
  }>;
}

const statusBadge = (status: OrderStatus) => {
  const map: Record<OrderStatus, { label: string; variant: "default" | "sale" | "outline" | "success" }> = {
    pending: { label: "Pending", variant: "outline" },
    confirmed: { label: "Confirmed", variant: "default" },
    processing: { label: "Processing", variant: "default" },
    shipped: { label: "Shipped", variant: "default" },
    delivered: { label: "Delivered", variant: "success" },
    cancelled: { label: "Cancelled", variant: "sale" },
  };
  return map[status];
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopDesc, setShopDesc] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setError(d.error); return; }
        setData(d);
        if (d.shop) {
          setShopName(d.shop.name);
          setShopDesc(d.shop.description || "");
        }
      })
      .catch(() => setError("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  const handleSaveSettings = async () => {
    setSaving(true);
    setSaveMsg("");
    try {
      const r = await fetch("/api/dashboard/shop", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: shopName, description: shopDesc }),
      });
      const d = await r.json();
      if (d.error) { setSaveMsg(d.error); return; }
      setSaveMsg("Settings saved successfully!");
    } catch {
      setSaveMsg("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  const { stats, productsList, ordersList, shop } = data!;

  const statCards = [
    { label: "Total Products", value: String(stats.totalProducts), icon: Package, color: "text-blue-600" },
    { label: "Total Orders", value: String(stats.totalOrders), icon: ShoppingBag, color: "text-green-600" },
    { label: "Total Customers", value: String(stats.totalCustomers), icon: Users, color: "text-purple-600" },
    { label: "Revenue", value: formatPrice(stats.revenue), icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
          {shop && <p className="text-sm text-gray-500 mt-1">{shop.name}</p>}
        </div>
        {shop && (
          <Link href="/products/new">
            <Button className="gap-2">
              <Plus size={16} /> Add Product
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-6">
          {["overview", "products", "orders", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-primary border-primary"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "overview" && (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            <Package size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">Welcome to your Dashboard</p>
            <p className="text-sm mb-6">
              {shop
                ? `You have ${stats.totalProducts} products and ${stats.totalOrders} orders.`
                : "Set up your shop to start selling."}
            </p>
          </CardContent>
        </Card>
      )}

      {activeTab === "products" && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Your Products ({productsList.length})</h3>
          </CardHeader>
          <CardContent>
            {productsList.length === 0 ? (
              <p className="text-sm text-gray-500">
                No products yet.{shop ? " Start adding products to your shop." : " Set up your shop first."}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-500">
                      <th className="pb-3 pr-4 font-medium">Product</th>
                      <th className="pb-3 pr-4 font-medium">Price</th>
                      <th className="pb-3 pr-4 font-medium">Stock</th>
                      <th className="pb-3 pr-4 font-medium">Featured</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsList.map((p) => (
                      <tr key={p.id} className="border-b last:border-0">
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                              {p.images?.[0] ? (
                                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                              ) : (
                                <Package size={16} className="text-gray-400" />
                              )}
                            </div>
                            <span className="font-medium truncate max-w-[200px]">{p.name}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4">{formatPrice(p.price)}</td>
                        <td className="py-3 pr-4">
                          <Badge variant={p.inStock ? "success" : "sale"}>
                            {p.inStock ? `${p.quantity} in stock` : "Out of stock"}
                          </Badge>
                        </td>
                        <td className="py-3 pr-4">{p.isFeatured ? "Yes" : "No"}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                              <Eye size={16} />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-green-600 transition-colors">
                              <Edit3 size={16} />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "orders" && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Orders ({ordersList.length})</h3>
          </CardHeader>
          <CardContent>
            {ordersList.length === 0 ? (
              <p className="text-sm text-gray-500">No orders received yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-500">
                      <th className="pb-3 pr-4 font-medium">Customer</th>
                      <th className="pb-3 pr-4 font-medium">Items</th>
                      <th className="pb-3 pr-4 font-medium">Total</th>
                      <th className="pb-3 pr-4 font-medium">Status</th>
                      <th className="pb-3 pr-4 font-medium">Payment</th>
                      <th className="pb-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersList.map((o) => (
                      <tr key={o.id} className="border-b last:border-0">
                        <td className="py-3 pr-4">{o.shippingAddress?.fullName || o.userId.slice(0, 8)}</td>
                        <td className="py-3 pr-4">{o.items.length} item(s)</td>
                        <td className="py-3 pr-4 font-medium">{formatPrice(o.total)}</td>
                        <td className="py-3 pr-4">
                          <Badge variant={statusBadge(o.status).variant}>
                            {statusBadge(o.status).label}
                          </Badge>
                        </td>
                        <td className="py-3 pr-4 capitalize">{o.paymentMethod}</td>
                        <td className="py-3 text-gray-500">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "settings" && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Shop Settings</h3>
          </CardHeader>
          <CardContent className="space-y-4 max-w-md">
            <Input
              label="Shop Name"
              id="shopName"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
            <div>
              <label htmlFor="shopDesc" className="block text-sm font-medium text-gray-700 mb-1">
                Shop Description
              </label>
              <textarea
                id="shopDesc"
                rows={3}
                value={shopDesc}
                onChange={(e) => setShopDesc(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button onClick={handleSaveSettings} disabled={saving}>
              {saving ? "Saving..." : "Save Settings"}
            </Button>
            {saveMsg && (
              <p className={`text-sm ${saveMsg.includes("success") ? "text-green-600" : "text-red-500"}`}>
                {saveMsg}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
