import { NextRequest, NextResponse } from "next/server";
import { initializePayment } from "@/lib/paystack";
import { z } from "zod";

export const dynamic = "force-dynamic";

const initializeSchema = z.object({
  email: z.string().email(),
  amount: z.number().positive(),
  reference: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = initializeSchema.parse(body);

    // Initialize payment with Paystack
    const response = await initializePayment(
      validatedData.email,
      validatedData.amount,
      validatedData.reference,
      validatedData.metadata || {}
    );

    if (!response.status) {
      return NextResponse.json(
        { success: false, error: response.message || "Failed to initialize payment" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      authorization_url: response.data.authorization_url,
      access_code: response.data.access_code,
      reference: response.data.reference,
    });
  } catch (error) {
    console.error("Payment initialization error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid request data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "An error occurred" },
      { status: 500 }
    );
  }
}
