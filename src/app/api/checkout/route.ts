import { NextResponse } from "next/server";
import { initializePayment, generateReference } from "@/lib/paystack";

export async function POST(req: Request) {
  try {
    const { email, amount, items, shippingAddress } = await req.json();

    const reference = generateReference();

    const response = await initializePayment({
      email,
      amount,
      reference,
      metadata: { items, shippingAddress },
    });

    if (!response.status) {
      return NextResponse.json(
        { error: "Payment initialization failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      authorizationUrl: response.data.authorization_url,
      reference,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}
