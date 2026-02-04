import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { bookingFormSchema } from "@/lib/validations";
import { z } from "zod";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = bookingFormSchema.parse(body);

    // Create or get user profile
    const { data: existingProfile } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("email", validatedData.email)
      .single();

    let userId: string;

    if (existingProfile && (existingProfile as { id: string }).id) {
      userId = (existingProfile as { id: string }).id;
    } else {
      // Create a new auth user and profile
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: validatedData.email,
        email_confirm: true,
        user_metadata: {
          full_name: validatedData.fullName,
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

      // Update profile with phone
      await supabaseAdmin
        .from("profiles")
        .update({
          full_name: validatedData.fullName,
          phone: validatedData.phone,
        })
        .eq("id", userId);
    }

    // Create booking
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .insert({
        user_id: userId,
        service_id: validatedData.serviceId,
        status: "pending",
        scheduled_at: validatedData.scheduledAt || null,
        notes: validatedData.notes || null,
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

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Booking API error:", error);

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get("id");

    if (!bookingId) {
      return NextResponse.json(
        { success: false, error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .select(`
        *,
        service:services(*),
        profile:profiles(*),
        payment:payments(*)
      `)
      .eq("id", bookingId)
      .single();

    if (error || !booking) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Get booking error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred" },
      { status: 500 }
    );
  }
}
