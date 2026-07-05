import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ items: [] });
  }

  try {
    const { db } = await import("@/lib/db");
    const { carts } = await import("@/lib/db/schema");
    const { eq } = await import("drizzle-orm");
    if (!db) {
      return NextResponse.json({ items: [] });
    }

    const cart = await db.select().from(carts).where(eq(carts.userId, userId));
    return NextResponse.json(cart[0] || { items: [] });
  } catch {
    return NextResponse.json({ items: [] });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { db } = await import("@/lib/db");
    const { carts } = await import("@/lib/db/schema");
    const { eq } = await import("drizzle-orm");
    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { items } = body;

    const existing = await db.select().from(carts).where(eq(carts.userId, userId));

    if (existing.length > 0) {
      await db
        .update(carts)
        .set({ items, updatedAt: new Date() })
        .where(eq(carts.userId, userId));
    } else {
      await db.insert(carts).values({ userId, items });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving cart:", error);
    return NextResponse.json({ error: "Failed to save cart" }, { status: 500 });
  }
}

export async function DELETE() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { db } = await import("@/lib/db");
    const { carts } = await import("@/lib/db/schema");
    const { eq } = await import("drizzle-orm");
    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    await db.delete(carts).where(eq(carts.userId, userId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
  }
}
