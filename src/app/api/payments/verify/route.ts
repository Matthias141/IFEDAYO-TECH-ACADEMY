import { NextRequest, NextResponse } from "next/server";
import { verifyPayment } from "@/lib/paystack";
import { supabaseAdmin } from "@/lib/supabase/server";
import { sendBookingConfirmation, sendPaymentReceipt } from "@/lib/resend";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { success: false, error: "Reference is required" },
        { status: 400 }
      );
    }

    // Verify payment with Paystack
    const paymentResponse = await verifyPayment(reference);

    if (!paymentResponse.status) {
      return NextResponse.json(
        { success: false, error: "Payment verification failed" },
        { status: 400 }
      );
    }

    const paymentData = paymentResponse.data;

    // Check if payment was successful
    if (paymentData.status !== "success") {
      return NextResponse.json({
        success: false,
        error: "Payment was not successful",
        data: {
          status: paymentData.status,
          gateway_response: paymentData.gateway_response,
        },
      });
    }

    // Check if payment already exists
    const { data: existingPayment } = await supabaseAdmin
      .from("payments")
      .select("id")
      .eq("paystack_reference", reference)
      .single();

    if (existingPayment) {
      return NextResponse.json({
        success: true,
        message: "Payment already verified",
        data: { status: "success" },
      });
    }

    // Get metadata from payment
    const metadata = paymentData.metadata || {};
    const serviceId = metadata.service_id as string;
    const customerName = metadata.customer_name as string;
    const customerPhone = metadata.customer_phone as string;
    const scheduledAt = metadata.scheduled_at as string | null;
    const notes = metadata.notes as string | null;
    const serviceName = metadata.service_name as string;

    // Create or get user profile
    const { data: existingProfile } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("email", paymentData.customer.email)
      .single();

    let userId: string;

    if (existingProfile && (existingProfile as { id: string }).id) {
      userId = (existingProfile as { id: string }).id;
    } else {
      // Create a new auth user
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: paymentData.customer.email,
        email_confirm: true,
        user_metadata: {
          full_name: customerName,
        },
      });

      if (authError || !authUser.user) {
        console.error("Auth error:", authError);
        return NextResponse.json(
          { success: false, error: "Failed to create user" },
          { status: 500 }
        );
      }

      userId = authUser.user.id;

      // Update profile
      await supabaseAdmin
        .from("profiles")
        .update({
          full_name: customerName,
          phone: customerPhone,
        })
        .eq("id", userId);
    }

    // Create booking
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .insert({
        user_id: userId,
        service_id: serviceId,
        status: "confirmed",
        scheduled_at: scheduledAt || null,
        notes: notes,
      })
      .select()
      .single();

    if (bookingError || !booking) {
      console.error("Booking error:", bookingError);
      return NextResponse.json(
        { success: false, error: "Failed to create booking" },
        { status: 500 }
      );
    }

    // Create payment record
    const bookingId = (booking as { id: string }).id;
    const { error: paymentError } = await supabaseAdmin
      .from("payments")
      .insert({
        booking_id: bookingId,
        amount_ngn: paymentData.amount,
        paystack_reference: reference,
        status: "success",
        paid_at: paymentData.paid_at,
      });

    if (paymentError) {
      console.error("Payment record error:", paymentError);
    }

    // Send confirmation emails
    const emailData = {
      to: paymentData.customer.email,
      customerName: customerName || "Customer",
      serviceName: serviceName || "Service",
      scheduledAt: scheduledAt
        ? new Date(scheduledAt).toLocaleString("en-NG", {
            dateStyle: "full",
            timeStyle: "short",
          })
        : undefined,
      amount: formatPrice(paymentData.amount),
      reference,
    };

    // Send emails asynchronously (don't block the response)
    Promise.all([
      sendBookingConfirmation(emailData),
      sendPaymentReceipt(emailData),
    ]).catch((err) => console.error("Email error:", err));

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      data: {
        status: "success",
        booking_id: bookingId,
      },
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred" },
      { status: 500 }
    );
  }
}
