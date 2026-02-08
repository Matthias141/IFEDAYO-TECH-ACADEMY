"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { servicesData, getServiceBySlug, type ServiceData } from "@/lib/services-data";
import {
  formatPrice,
  formatDuration,
  getServiceTypeLabel,
  getNextSevenDays,
  getAvailableTimeSlots,
  generateReference,
} from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  Video,
  Target,
  GraduationCap,
  CreditCard,
} from "lucide-react";

const iconMap: Record<string, typeof Video> = {
  video: Video,
  "file-text": FileText,
  target: Target,
  "graduation-cap": GraduationCap,
};

type BookingStep = "service" | "details" | "schedule" | "payment" | "success";

interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  selectedDate: Date | null;
  selectedTime: string | null;
}

function BookContent() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");

  const [step, setStep] = useState<BookingStep>("service");
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    notes: "",
    selectedDate: null,
    selectedTime: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      const service = getServiceBySlug(preselectedService);
      if (service) {
        setSelectedService(service);
        setStep("details");
      }
    }
  }, [preselectedService]);

  const availableDates = getNextSevenDays();

  const validateDetails = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServiceSelect = (service: ServiceData) => {
    setSelectedService(service);
    setStep("details");
  };

  const handleDetailsSubmit = () => {
    if (validateDetails()) {
      if (selectedService?.type === "video_call") {
        setStep("schedule");
      } else {
        setStep("payment");
      }
    }
  };

  const handleScheduleSelect = () => {
    if (formData.selectedDate && formData.selectedTime) {
      setStep("payment");
    }
  };

  const handlePayment = async () => {
    if (!selectedService) return;

    setIsLoading(true);

    try {
      const reference = generateReference();

      const response = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          amount: selectedService.price_ngn,
          reference,
          metadata: {
            service_id: selectedService.id,
            service_name: selectedService.name,
            customer_name: formData.fullName,
            customer_phone: formData.phone,
            scheduled_at: formData.selectedDate && formData.selectedTime
              ? `${formData.selectedDate.toISOString().split("T")[0]} ${formData.selectedTime}`
              : null,
            notes: formData.notes,
          },
        }),
      });

      const data = await response.json();

      if (data.success && data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        alert("Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (step === "details") setStep("service");
    else if (step === "schedule") setStep("details");
    else if (step === "payment") {
      if (selectedService?.type === "video_call") {
        setStep("schedule");
      } else {
        setStep("details");
      }
    }
  };

  const steps = [
    { id: "service", label: "Service" },
    { id: "details", label: "Details" },
    ...(selectedService?.type === "video_call"
      ? [{ id: "schedule", label: "Schedule" }]
      : []),
    { id: "payment", label: "Payment" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              {steps.map((s, index) => (
                <div key={s.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      index <= currentStepIndex
                        ? "border-primary bg-primary text-white"
                        : "border-white/20 text-gray-500"
                    }`}
                  >
                    {index < currentStepIndex ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      index <= currentStepIndex ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {s.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 sm:w-24 h-0.5 mx-4 ${
                        index < currentStepIndex ? "bg-primary" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step: Service Selection */}
          {step === "service" && (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-white text-center mb-2">
                Choose Your Service
              </h1>
              <p className="text-gray-400 text-center mb-8">
                Select the service that best fits your needs
              </p>

              <div className="grid gap-4">
                {servicesData.map((service) => {
                  const Icon = iconMap[service.icon] || Video;
                  return (
                    <Card
                      key={service.slug}
                      variant="solid"
                      hover
                      className={`cursor-pointer transition-all ${
                        selectedService?.slug === service.slug
                          ? "border-primary ring-2 ring-primary/30"
                          : ""
                      }`}
                      onClick={() => handleServiceSelect(service)}
                    >
                      <CardContent className="flex items-center gap-4 py-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-semibold text-white">
                                {service.name}
                              </h3>
                              <p className="text-sm text-gray-400 mt-1">
                                {service.description}
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatDuration(service.duration_minutes)}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {getServiceTypeLabel(service.type)}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xl font-bold text-white">
                                {formatPrice(service.price_ngn)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step: Details */}
          {step === "details" && selectedService && (
            <div className="animate-fade-in">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <h1 className="text-3xl font-bold text-white text-center mb-2">
                Your Details
              </h1>
              <p className="text-gray-400 text-center mb-8">
                Tell us a bit about yourself
              </p>

              <Card variant="solid" className="mb-6">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    {(() => {
                      const Icon = iconMap[selectedService.icon] || Video;
                      return <Icon className="w-6 h-6 text-primary" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {selectedService.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {formatPrice(selectedService.price_ngn)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                  error={errors.fullName}
                  icon={<User className="w-5 h-5" />}
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  error={errors.email}
                  icon={<Mail className="w-5 h-5" />}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  error={errors.phone}
                  icon={<Phone className="w-5 h-5" />}
                />

                <Textarea
                  label="Additional Notes (Optional)"
                  placeholder="Tell us what you&apos;d like to focus on..."
                  rows={3}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                />
              </div>

              <Button
                onClick={handleDetailsSubmit}
                className="w-full mt-6"
                size="lg"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step: Schedule */}
          {step === "schedule" && selectedService && (
            <div className="animate-fade-in">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <h1 className="text-3xl font-bold text-white text-center mb-2">
                Pick a Date & Time
              </h1>
              <p className="text-gray-400 text-center mb-8">
                Choose when you&apos;d like to have your session
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Select Date
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableDates.map((date) => (
                      <button
                        key={date.toISOString()}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            selectedDate: date,
                            selectedTime: null,
                          }))
                        }
                        className={`p-3 rounded-lg border text-center transition-all ${
                          formData.selectedDate?.toDateString() ===
                          date.toDateString()
                            ? "border-primary bg-primary/20 text-white"
                            : "border-white/10 hover:border-white/20 text-gray-300"
                        }`}
                      >
                        <div className="text-xs text-gray-400">
                          {date.toLocaleDateString("en-NG", { weekday: "short" })}
                        </div>
                        <div className="text-lg font-semibold">
                          {date.getDate()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {date.toLocaleDateString("en-NG", { month: "short" })}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Select Time
                  </label>
                  {formData.selectedDate ? (
                    <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                      {getAvailableTimeSlots(formData.selectedDate).map((time) => (
                        <button
                          key={time}
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, selectedTime: time }))
                          }
                          className={`p-2 rounded-lg border text-sm transition-all ${
                            formData.selectedTime === time
                              ? "border-primary bg-primary/20 text-white"
                              : "border-white/10 hover:border-white/20 text-gray-300"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm p-4 border border-dashed border-white/10 rounded-lg text-center">
                      Please select a date first
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleScheduleSelect}
                className="w-full mt-6"
                size="lg"
                disabled={!formData.selectedDate || !formData.selectedTime}
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Step: Payment */}
          {step === "payment" && selectedService && (
            <div className="animate-fade-in">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <h1 className="text-3xl font-bold text-white text-center mb-2">
                Payment Summary
              </h1>
              <p className="text-gray-400 text-center mb-8">
                Review your booking and complete payment
              </p>

              <Card variant="solid" className="mb-6">
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">
                        {selectedService.name}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {formatDuration(selectedService.duration_minutes)}
                      </p>
                    </div>
                    <Badge>{getServiceTypeLabel(selectedService.type)}</Badge>
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Name</span>
                      <span className="text-white">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Email</span>
                      <span className="text-white">{formData.email}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Phone</span>
                      <span className="text-white">{formData.phone}</span>
                    </div>
                    {formData.selectedDate && formData.selectedTime && (
                      <div className="flex justify-between text-gray-400">
                        <span>Scheduled</span>
                        <span className="text-white">
                          {formData.selectedDate.toLocaleDateString("en-NG", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}{" "}
                          at {formData.selectedTime}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                    <span className="text-gray-400">Total</span>
                    <span className="text-2xl font-bold text-white">
                      {formatPrice(selectedService.price_ngn)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handlePayment}
                className="w-full"
                size="lg"
                isLoading={isLoading}
              >
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pay with Paystack
                  </>
                )}
              </Button>

              <p className="text-center text-gray-500 text-xs mt-4">
                Secure payment powered by Paystack. Supports cards, bank transfer,
                and USSD.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function BookPage() {
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
      <BookContent />
    </Suspense>
  );
}
