"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Home, Mail, Calendar } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const trxref = searchParams.get("trxref");

  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const ref = reference || trxref;
      if (!ref) {
        setStatus("failed");
        setMessage("No payment reference found");
        return;
      }

      try {
        const response = await fetch(`/api/payments/verify?reference=${ref}`);
        const data = await response.json();

        if (data.success && data.data?.status === "success") {
          setStatus("success");
          setMessage("Your payment was successful!");
        } else {
          setStatus("failed");
          setMessage(data.message || "Payment verification failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("failed");
        setMessage("An error occurred while verifying your payment");
      }
    };

    verifyPayment();
  }, [reference, trxref]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 w-full">
          <Card variant="solid" className="text-center">
            <CardContent className="py-12">
              {status === "loading" && (
                <>
                  <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin mb-6" />
                  <h1 className="text-2xl font-bold text-white mb-2">
                    Verifying Payment...
                  </h1>
                  <p className="text-gray-400">
                    Please wait while we confirm your payment.
                  </p>
                </>
              )}

              {status === "success" && (
                <>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-accent" />
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Booking Confirmed!
                  </h1>
                  <p className="text-gray-400 mb-8">{message}</p>

                  <div className="bg-white/5 rounded-xl p-6 mb-8 text-left">
                    <h3 className="text-sm font-medium text-gray-400 uppercase mb-4">
                      What&apos;s Next?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-gray-300">
                        <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>
                          Check your email for booking confirmation and receipt
                        </span>
                      </li>
                      <li className="flex items-start gap-3 text-gray-300">
                        <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>
                          We&apos;ll send you a meeting link 24 hours before your session
                        </span>
                      </li>
                    </ul>
                  </div>

                  <Link href="/">
                    <Button size="lg" className="w-full">
                      <Home className="w-5 h-5 mr-2" />
                      Back to Home
                    </Button>
                  </Link>
                </>
              )}

              {status === "failed" && (
                <>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
                    <XCircle className="w-12 h-12 text-red-400" />
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Payment Failed
                  </h1>
                  <p className="text-gray-400 mb-8">{message}</p>

                  <div className="space-y-3">
                    <Link href="/book">
                      <Button size="lg" className="w-full">
                        Try Again
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button variant="outline" size="lg" className="w-full">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <>
          <Navbar />
          <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </main>
          <Footer />
        </>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
