import { z } from "zod";

export const bookingFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+\-\s]+$/, "Please enter a valid phone number"),
  serviceId: z.string().uuid("Invalid service selected"),
  scheduledAt: z.string().datetime().optional(),
  notes: z.string().max(500, "Notes must be less than 500 characters").optional(),
});

export const paymentInitSchema = z.object({
  bookingId: z.string().uuid("Invalid booking ID"),
  email: z.string().email("Invalid email"),
  amount: z.number().positive("Amount must be positive"),
});

export const paymentVerifySchema = z.object({
  reference: z.string().min(1, "Reference is required"),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
export type PaymentInitData = z.infer<typeof paymentInitSchema>;
export type PaymentVerifyData = z.infer<typeof paymentVerifySchema>;
