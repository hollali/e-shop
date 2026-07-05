import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { db } = await import("@/lib/db");
    const { shops } = await import("@/lib/db/schema");
    const { eq } = await import("drizzle-orm");

    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const body = await req.json();
    const { name, description, logo } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Shop name is required" }, { status: 400 });
    }

    const vendorShops = await db
      .select()
      .from(shops)
      .where(eq(shops.vendorId, userId))
      .limit(1);

    if (vendorShops.length === 0) {
      return NextResponse.json({ error: "No shop found" }, { status: 404 });
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    await db
      .update(shops)
      .set({
        name: name.trim(),
        slug,
        description: description?.trim() || null,
        logo: logo || null,
        updatedAt: new Date(),
      })
      .where(eq(shops.id, vendorShops[0].id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Shop settings error:", error);
    return NextResponse.json(
      { error: "Failed to update shop settings" },
      { status: 500 }
    );
  }
}
