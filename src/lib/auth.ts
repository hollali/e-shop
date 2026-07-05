import { auth, currentUser } from "@clerk/nextjs/server";

export async function getAuthUser() {
  const user = await currentUser();
  return user;
}

export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

export async function requireVendor() {
  const { userId, sessionClaims } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const role = (sessionClaims as any)?.role;
  if (role !== "vendor" && role !== "admin") throw new Error("Forbidden");
  return userId;
}

export async function requireAdmin() {
  const { userId, sessionClaims } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const role = (sessionClaims as any)?.role;
  if (role !== "admin") throw new Error("Forbidden");
  return userId;
}
