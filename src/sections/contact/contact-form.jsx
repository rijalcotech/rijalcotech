"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "@/components/snackbar";
import { sendContactForm } from "@/api/contact";
import { useAppSelector } from "@/redux/hooks";

// ---------------- Validation Schema ----------------
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

// ---------------- Reusable Field Component ----------------
function FormField({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs font-medium text-red-500 mt-1">{error}</p>}
    </div>
  );
}

// ---------------- Spinner ----------------
function Spinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

// ---------------- Base input classes ----------------
const inputBase = [
  "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all duration-300",
  "bg-gray-50/50 text-gray-900 placeholder-gray-400",
  "focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10",
  "hover:border-gray-300",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

const inputError = "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20";

// ----------------------------------------------------------------------

export function ContactForm({ className = "", ...other }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color || "#4f46e5";
  const secondaryColor = vendor?.secondary_color || "#06b6d4";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await sendContactForm(data);
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (err) {
      toast.error(err?.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`p-8 md:p-12 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden ${className}`}
      {...other}
    >
      {/* Decorative Blob */}
      <div
        className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
      />

      <div className="relative z-10">
        <div className="mb-10">
          <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-3">
            Let's start a{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
            >
              conversation
            </span>
          </h3>
          <p className="text-gray-500 text-base">
            We'd love to hear from you. Please fill out this form or shoot us an email.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Full Name" error={errors.name?.message}>
              <input
                type="text"
                placeholder="John Doe"
                {...register("name")}
                disabled={isSubmitting}
                className={`${inputBase} ${errors.name ? inputError : ""}`}
              />
            </FormField>

            <FormField label="Email Address" error={errors.email?.message}>
              <input
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                disabled={isSubmitting}
                className={`${inputBase} ${errors.email ? inputError : ""}`}
              />
            </FormField>
          </div>

          <FormField label="Subject" error={errors.subject?.message}>
            <input
              type="text"
              placeholder="How can we help?"
              {...register("subject")}
              disabled={isSubmitting}
              className={`${inputBase} ${errors.subject ? inputError : ""}`}
            />
          </FormField>

          <FormField label="Message" error={errors.message?.message}>
            <textarea
              rows={5}
              placeholder="Tell us a little more about what you need..."
              {...register("message")}
              disabled={isSubmitting}
              className={`${inputBase} resize-none ${errors.message ? inputError : ""}`}
            />
          </FormField>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
            className={[
              "mt-2 flex items-center justify-center",
              "w-full rounded-xl px-8 py-4 text-base font-semibold text-white",
              "shadow-lg hover:shadow-xl hover:-translate-y-0.5",
              "transition-all duration-300 ease-in-out",
              "disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0",
            ].join(" ")}
          >
            {isSubmitting && <Spinner />}
            {isSubmitting ? "Sending message..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}