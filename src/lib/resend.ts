import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("Missing RESEND_API_KEY environment variable");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

interface BookingEmailData {
  to: string;
  customerName: string;
  serviceName: string;
  scheduledAt?: string;
  meetLink?: string;
  amount: string;
  reference: string;
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  const { to, customerName, serviceName, scheduledAt, meetLink, amount, reference } = data;

  const subject = `Booking Confirmed - ${serviceName}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #ffffff; margin: 0; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #111111; border-radius: 16px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #32a6ff; margin: 0; font-size: 24px;">Ifedayo Tech Academy</h1>
        </div>

        <h2 style="color: #ffffff; margin-top: 0;">Booking Confirmed! 🎉</h2>

        <p style="color: #a0a0a0; line-height: 1.6;">
          Hi ${customerName},
        </p>

        <p style="color: #a0a0a0; line-height: 1.6;">
          Thank you for your booking. Here are your details:
        </p>

        <div style="background-color: rgba(50, 166, 255, 0.1); border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="margin: 8px 0; color: #ffffff;">
            <strong>Service:</strong> ${serviceName}
          </p>
          ${scheduledAt ? `
          <p style="margin: 8px 0; color: #ffffff;">
            <strong>Scheduled:</strong> ${scheduledAt}
          </p>
          ` : ""}
          <p style="margin: 8px 0; color: #ffffff;">
            <strong>Amount Paid:</strong> ${amount}
          </p>
          <p style="margin: 8px 0; color: #ffffff;">
            <strong>Reference:</strong> ${reference}
          </p>
        </div>

        ${meetLink ? `
        <div style="text-align: center; margin: 32px 0;">
          <a href="${meetLink}" style="display: inline-block; background: linear-gradient(135deg, #32a6ff 0%, #008751 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600;">
            Join Meeting
          </a>
        </div>
        ` : `
        <p style="color: #a0a0a0; line-height: 1.6;">
          We'll send you an email with next steps within 24 hours.
        </p>
        `}

        <p style="color: #a0a0a0; line-height: 1.6;">
          If you have any questions, feel free to reply to this email.
        </p>

        <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 32px; padding-top: 24px; text-align: center;">
          <p style="color: #666666; font-size: 14px; margin: 0;">
            © ${new Date().getFullYear()} Ifedayo Tech Academy. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await getResend().emails.send({
      from: "Ifedayo Tech Academy <bookings@ifedayotech.com>",
      to,
      subject,
      html,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export async function sendPaymentReceipt(data: BookingEmailData) {
  const { to, customerName, serviceName, amount, reference } = data;

  const subject = `Payment Receipt - ${reference}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #ffffff; margin: 0; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #111111; border-radius: 16px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #32a6ff; margin: 0; font-size: 24px;">Ifedayo Tech Academy</h1>
        </div>

        <h2 style="color: #ffffff; margin-top: 0;">Payment Receipt</h2>

        <p style="color: #a0a0a0; line-height: 1.6;">
          Hi ${customerName},
        </p>

        <p style="color: #a0a0a0; line-height: 1.6;">
          Here's your payment receipt:
        </p>

        <div style="background-color: rgba(0, 135, 81, 0.1); border-radius: 12px; padding: 24px; margin: 24px 0; border: 1px solid rgba(0, 135, 81, 0.3);">
          <p style="margin: 8px 0; color: #ffffff;">
            <strong>Service:</strong> ${serviceName}
          </p>
          <p style="margin: 8px 0; color: #ffffff;">
            <strong>Amount:</strong> ${amount}
          </p>
          <p style="margin: 8px 0; color: #ffffff;">
            <strong>Reference:</strong> ${reference}
          </p>
          <p style="margin: 8px 0; color: #ffffff;">
            <strong>Date:</strong> ${new Date().toLocaleDateString("en-NG", { dateStyle: "long" })}
          </p>
          <p style="margin: 8px 0; color: #00e66d;">
            <strong>Status:</strong> ✓ Paid
          </p>
        </div>

        <p style="color: #a0a0a0; line-height: 1.6;">
          Thank you for your purchase!
        </p>

        <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 32px; padding-top: 24px; text-align: center;">
          <p style="color: #666666; font-size: 14px; margin: 0;">
            © ${new Date().getFullYear()} Ifedayo Tech Academy. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await getResend().emails.send({
      from: "Ifedayo Tech Academy <bookings@ifedayotech.com>",
      to,
      subject,
      html,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export async function sendSessionReminder(data: Omit<BookingEmailData, "amount" | "reference">) {
  const { to, customerName, serviceName, scheduledAt, meetLink } = data;

  const subject = `Reminder: ${serviceName} Tomorrow`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0a; color: #ffffff; margin: 0; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #111111; border-radius: 16px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #32a6ff; margin: 0; font-size: 24px;">Ifedayo Tech Academy</h1>
        </div>

        <h2 style="color: #ffffff; margin-top: 0;">Session Reminder ⏰</h2>

        <p style="color: #a0a0a0; line-height: 1.6;">
          Hi ${customerName},
        </p>

        <p style="color: #a0a0a0; line-height: 1.6;">
          This is a reminder that your session is scheduled for tomorrow:
        </p>

        <div style="background-color: rgba(50, 166, 255, 0.1); border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="margin: 8px 0; color: #ffffff;">
            <strong>Service:</strong> ${serviceName}
          </p>
          <p style="margin: 8px 0; color: #ffffff;">
            <strong>Time:</strong> ${scheduledAt}
          </p>
        </div>

        ${meetLink ? `
        <div style="text-align: center; margin: 32px 0;">
          <a href="${meetLink}" style="display: inline-block; background: linear-gradient(135deg, #32a6ff 0%, #008751 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600;">
            Join Meeting
          </a>
        </div>
        <p style="color: #a0a0a0; line-height: 1.6; text-align: center;">
          Save this link - you'll need it to join the session.
        </p>
        ` : ""}

        <p style="color: #a0a0a0; line-height: 1.6;">
          See you tomorrow!
        </p>

        <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 32px; padding-top: 24px; text-align: center;">
          <p style="color: #666666; font-size: 14px; margin: 0;">
            © ${new Date().getFullYear()} Ifedayo Tech Academy. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await getResend().emails.send({
      from: "Ifedayo Tech Academy <bookings@ifedayotech.com>",
      to,
      subject,
      html,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
