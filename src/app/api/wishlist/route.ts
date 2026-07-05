import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { db } = await import("@/lib/db");
    const { wishlists } = await import("@/lib/db/schema");
    const { eq } = await import("drizzle-orm");
    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }
    const items = await db.select().from(wishlists).where(eq(wishlists.userId, userId));
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { db } = await import("@/lib/db");
    const { wishlists } = await import("@/lib/db/schema");
    const { eq } = await import("drizzle-orm");
    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { productId, productName, productSlug, productPrice, productImage } = body;

    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const existing = await db
      .select()
      .from(wishlists)
      .where(eq(wishlists.productId, productId));

    if (existing.length > 0) {
      return NextResponse.json({ message: "Already in wishlist" });
    }

    await db.insert(wishlists).values({
      userId,
      productId,
      productName,
      productSlug,
      productPrice,
      productImage,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { db } = await import("@/lib/db");
    const { wishlists } = await import("@/lib/db/schema");
    const { eq, and } = await import("drizzle-orm");
    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const productId = req.nextUrl.searchParams.get("productId");
    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    await db
      .delete(wishlists)
      .where(and(eq(wishlists.userId, userId), eq(wishlists.productId, productId)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 });
  }
}
