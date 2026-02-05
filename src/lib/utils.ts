import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(kobo: number): string {
  const naira = kobo / 100;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(naira);
}

export function formatDuration(minutes: number | null): string {
  if (!minutes) return "Self-paced";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours} hr`;
  return `${hours} hr ${remainingMinutes} min`;
}

export function generateReference(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `ITA-${timestamp}-${randomPart}`.toUpperCase();
}

export function getServiceTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    video_call: "Video Call",
    async: "Async Delivery",
    self_paced: "Self-Paced",
  };
  return labels[type] || type;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400",
    confirmed: "bg-blue-500/20 text-blue-400",
    completed: "bg-green-500/20 text-green-400",
    cancelled: "bg-red-500/20 text-red-400",
    success: "bg-green-500/20 text-green-400",
    failed: "bg-red-500/20 text-red-400",
  };
  return colors[status] || "bg-gray-500/20 text-gray-400";
}

export function getAvailableTimeSlots(date: Date): string[] {
  const slots: string[] = [];
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  // Generate slots from 9 AM to 6 PM (Nigerian business hours)
  for (let hour = 9; hour <= 18; hour++) {
    for (const minute of [0, 30]) {
      if (hour === 18 && minute === 30) continue; // Skip 6:30 PM

      const slotTime = new Date(date);
      slotTime.setHours(hour, minute, 0, 0);

      // Skip past times for today
      if (isToday && slotTime <= today) continue;

      const timeString = slotTime.toLocaleTimeString("en-NG", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      slots.push(timeString);
    }
  }

  return slots;
}

export function getNextSevenDays(): Date[] {
  const days: Date[] = [];
  const today = new Date();

  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    // Skip Sundays (day 0)
    if (date.getDay() !== 0) {
      days.push(date);
    }
  }

  return days;
}
