import crypto from "crypto";

function getPaystackSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new Error("Missing PAYSTACK_SECRET_KEY environment variable");
  }
  return key;
}

function getPaystackWebhookSecret(): string {
  const secret = process.env.PAYSTACK_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("Missing PAYSTACK_WEBHOOK_SECRET environment variable");
  }
  return secret;
}

interface PaystackInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Record<string, unknown>;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
    };
  };
}

export async function initializePayment(
  email: string,
  amount: number, // in kobo
  reference: string,
  metadata: Record<string, unknown> = {}
): Promise<PaystackInitResponse> {
  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getPaystackSecretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount,
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/book/success`,
      metadata,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to initialize payment");
  }

  return response.json();
}

export async function verifyPayment(reference: string): Promise<PaystackVerifyResponse> {
  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getPaystackSecretKey()}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to verify payment");
  }

  return response.json();
}

export function verifyWebhookSignature(body: string, signature: string): boolean {
  const hash = crypto
    .createHmac("sha512", getPaystackWebhookSecret())
    .update(body)
    .digest("hex");

  return hash === signature;
}

export interface PaystackWebhookEvent {
  event: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    metadata: {
      booking_id?: string;
      [key: string]: unknown;
    };
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
    };
  };
}
