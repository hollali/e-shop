"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, ShoppingBag, Users, TrendingUp, Plus } from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Total Products", value: "12", icon: Package, color: "text-blue-600" },
    { label: "Total Orders", value: "45", icon: ShoppingBag, color: "text-green-600" },
    { label: "Total Customers", value: "28", icon: Users, color: "text-purple-600" },
    { label: "Revenue", value: "GHS 45,230", icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
        <Button className="gap-2">
          <Plus size={16} /> Add Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
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

      {/* Tabs */}
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
              Start by adding your first product or managing your shop settings.
            </p>
            <Button>Add Your First Product</Button>
          </CardContent>
        </Card>
      )}

      {activeTab === "products" && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Your Products</h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              No products yet. Start adding products to your shop.
            </p>
          </CardContent>
        </Card>
      )}

      {activeTab === "orders" && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Orders</h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              No orders received yet.
            </p>
          </CardContent>
        </Card>
      )}

      {activeTab === "settings" && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Shop Settings</h3>
          </CardHeader>
          <CardContent className="space-y-4 max-w-md">
            <Input label="Shop Name" id="shopName" />
            <Input label="Shop Description" id="shopDesc" />
            <Button>Save Settings</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
