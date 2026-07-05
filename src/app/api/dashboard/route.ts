import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { db } = await import("@/lib/db");
    const { shops, products, orders } = await import("@/lib/db/schema");
    const { eq, desc, count, and, ne, sql } = await import("drizzle-orm");

    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const vendorShops = await db
      .select()
      .from(shops)
      .where(eq(shops.vendorId, userId))
      .limit(1);

    if (vendorShops.length === 0) {
      return NextResponse.json({
        shop: null,
        stats: { totalProducts: 0, totalOrders: 0, totalCustomers: 0, revenue: 0 },
        productsList: [],
        ordersList: [],
      });
    }

    const shop = vendorShops[0];

    const [productCount] = await db
      .select({ count: count() })
      .from(products)
      .where(eq(products.shopId, shop.id));

    const vendorProducts = await db
      .select()
      .from(products)
      .where(eq(products.shopId, shop.id))
      .orderBy(desc(products.createdAt));

    const allOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(100);

    const vendorOrders = allOrders.filter((o) => {
      const items = o.items as { shopId?: string }[];
      return items?.some((item) => item.shopId === shop.id);
    });

    const paidOrders = vendorOrders.filter(
      (o) => o.status !== "cancelled" && o.status !== "pending"
    );
    const totalRevenue = paidOrders.reduce((sum, o) => sum + Number(o.total), 0);

    const uniqueCustomerIds = [...new Set(vendorOrders.map((o) => o.userId))];

    return NextResponse.json({
      shop,
      stats: {
        totalProducts: Number(productCount.count),
        totalOrders: vendorOrders.length,
        totalCustomers: uniqueCustomerIds.length,
        revenue: totalRevenue,
      },
      productsList: vendorProducts,
      ordersList: vendorOrders,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard" },
      { status: 500 }
    );
  }
}
