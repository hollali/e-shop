const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_API = "https://api.paystack.co";

export async function initializePayment(params: {
  email: string;
  amount: number;
  reference: string;
  metadata?: Record<string, any>;
}) {
  const response = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amount * 100,
      reference: params.reference,
      metadata: params.metadata,
    }),
  });

  return response.json();
}

export async function verifyPayment(reference: string) {
  const response = await fetch(
    `${PAYSTACK_API}/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  return response.json();
}

export function generateReference(): string {
  return `ESHOP-${Date.now()}-${Math.random().toString(36).substring(7)}`;
}
