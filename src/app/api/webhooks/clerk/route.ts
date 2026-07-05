import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";

type UserEvent = {
  data: {
    id: string;
    email_addresses: { email_address: string }[];
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
    phone_numbers: { phone_number: string }[];
    created_at: number;
    updated_at: number;
  };
  type: "user.created" | "user.updated" | "user.deleted";
};

export async function POST(req: Request) {
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CLERK_WEBHOOK_SECRET not configured" },
      { status: 500 }
    );
  }

  let payload: UserEvent;
  try {
    const body = await req.text();
    const wh = new Webhook(secret);
    payload = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as UserEvent;
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  try {
    const { db } = await import("@/lib/db");
    const { users } = await import("@/lib/db/schema");
    const { eq } = await import("drizzle-orm");

    if (!db) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const { data, type } = payload;

    if (type === "user.created" || type === "user.updated") {
      const email = data.email_addresses[0]?.email_address;
      const firstName = data.first_name || "";
      const lastName = data.last_name || "";
      const name = `${firstName} ${lastName}`.trim() || email;
      const avatar = data.image_url;
      const phone = data.phone_numbers[0]?.phone_number || null;

      await db
        .insert(users)
        .values({
          id: data.id,
          email,
          name,
          avatar,
          phone,
        })
        .onConflictDoUpdate({
          target: users.id,
          set: {
            email,
            name,
            avatar,
            phone,
            updatedAt: new Date(),
          },
        });
    }

    if (type === "user.deleted") {
      await db.delete(users).where(eq(users.id, data.id));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing Clerk webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
