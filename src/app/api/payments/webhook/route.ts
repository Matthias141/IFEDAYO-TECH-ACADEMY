import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature, type PaystackWebhookEvent } from "@/lib/paystack";
import { supabaseAdmin } from "@/lib/supabase/server";
import { sendBookingConfirmation, sendPaymentReceipt } from "@/lib/resend";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    // Verify webhook signature
    if (!signature || !verifyWebhookSignature(body, signature)) {
      console.error("Invalid webhook signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const event: PaystackWebhookEvent = JSON.parse(body);

    // Handle different event types
    switch (event.event) {
      case "charge.success": {
        const data = event.data;

        // Check if payment already processed
        const { data: existingPayment } = await supabaseAdmin
          .from("payments")
          .select("id")
          .eq("paystack_reference", data.reference)
          .single();

        if (existingPayment) {
          console.log("Payment already processed:", data.reference);
          return NextResponse.json({ received: true });
        }

        // Get metadata
        const metadata = data.metadata || {};
        const bookingId = metadata.booking_id as string | undefined;
        const serviceId = metadata.service_id as string;
        const customerName = metadata.customer_name as string;
        const customerPhone = metadata.customer_phone as string;
        const scheduledAt = metadata.scheduled_at as string | null;
        const notes = metadata.notes as string | null;
        const serviceName = metadata.service_name as string;

        let finalBookingId = bookingId;

        // If no booking exists, create one
        if (!finalBookingId) {
          // Get or create user
          const { data: existingProfile } = await supabaseAdmin
            .from("profiles")
            .select("id")
            .eq("email", data.customer.email)
            .single();

          let userId: string;

          if (existingProfile && (existingProfile as { id: string }).id) {
            userId = (existingProfile as { id: string }).id;
          } else {
            const { data: authUser, error: authError } =
              await supabaseAdmin.auth.admin.createUser({
                email: data.customer.email,
                email_confirm: true,
                user_metadata: {
                  full_name: customerName,
                },
              });

            if (authError || !authUser.user) {
              console.error("Failed to create user:", authError);
              return NextResponse.json(
                { error: "Failed to process webhook" },
                { status: 500 }
              );
            }

            userId = authUser.user.id;

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
            console.error("Failed to create booking:", bookingError);
            return NextResponse.json(
              { error: "Failed to process webhook" },
              { status: 500 }
            );
          }

          finalBookingId = (booking as { id: string }).id;
        } else {
          // Update existing booking status
          await supabaseAdmin
            .from("bookings")
            .update({ status: "confirmed" })
            .eq("id", finalBookingId);
        }

        // Create payment record
        await supabaseAdmin.from("payments").insert({
          booking_id: finalBookingId,
          amount_ngn: data.amount,
          paystack_reference: data.reference,
          status: "success",
          paid_at: data.paid_at,
        });

        // Send emails
        const emailData = {
          to: data.customer.email,
          customerName: customerName || "Customer",
          serviceName: serviceName || "Service",
          scheduledAt: scheduledAt
            ? new Date(scheduledAt).toLocaleString("en-NG", {
                dateStyle: "full",
                timeStyle: "short",
              })
            : undefined,
          amount: formatPrice(data.amount),
          reference: data.reference,
        };

        Promise.all([
          sendBookingConfirmation(emailData),
          sendPaymentReceipt(emailData),
        ]).catch((err) => console.error("Email error:", err));

        console.log("Payment processed successfully:", data.reference);
        break;
      }

      case "charge.failed": {
        const data = event.data;
        const bookingId = data.metadata?.booking_id as string | undefined;

        if (bookingId) {
          // Update booking status
          await supabaseAdmin
            .from("bookings")
            .update({ status: "cancelled" })
            .eq("id", bookingId);

          // Create failed payment record
          await supabaseAdmin.from("payments").insert({
            booking_id: bookingId,
            amount_ngn: data.amount,
            paystack_reference: data.reference,
            status: "failed",
          });
        }

        console.log("Payment failed:", data.reference);
        break;
      }

      default:
        console.log("Unhandled webhook event:", event.event);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
