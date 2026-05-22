"use client";

import { useState } from "react";
import { MdSend, MdMessage } from "react-icons/md";

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

interface ContactFormProps {
  title?: string;
  defaultSubject?: string;
  defaultIdentity?: string;
}

export function ContactForm({
  title = "Send us a Message",
  defaultSubject = "General Inquiry",
  defaultIdentity = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    identity: defaultIdentity,
    fullName: "",
    phone: "",
    email: "",
    subject: defaultSubject,
    state: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Something went wrong");
      }

      setStatus("success");
      setFormData({
        identity: "",
        fullName: "",
        phone: "",
        email: "",
        subject: "General Inquiry",
        state: "",
        message: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  const inputClass =
    "w-full px-5 py-4 rounded-2xl bg-white border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm";
  const selectClass = `${inputClass} appearance-none`;

  const SelectArrow = () => (
    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
      <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );

  return (
    <div className="bg-surface rounded-[3rem] p-8 md:p-12 ring-1 ring-border shadow-glow relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 h-64 w-64 bg-gradient-green opacity-5 blur-3xl rounded-full" />

      <div className="relative z-10">
        <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
          <MdMessage className="h-6 w-6 text-primary" />
          {title}
        </h3>

        {status === "success" && (
          <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
            ✅ Message sent successfully! We'll get back to you shortly.
          </div>
        )}

        {status === "error" && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
            ❌ {errorMsg}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Who are you */}
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1 text-foreground">
              Who are you? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="identity"
                value={formData.identity}
                onChange={handleChange}
                required
                className={selectClass}
              >
                <option value="" disabled>Select your identity</option>
                <option>Farmer</option>
                <option>FPO Representative</option>
                <option>Dealer/Channel Partner</option>
                <option>Company Representative</option>
                <option>Student</option>
                <option>Job Seeker</option>
                <option>Others</option>
              </select>
              <SelectArrow />
            </div>
          </div>

          {/* Full Name + Phone */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1 text-foreground">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1 text-foreground">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 00000 00000"
                required
                pattern="[0-9+\s\-]{7,15}"
                className={inputClass}
              />
            </div>
          </div>

          {/* Email + Subject */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1 text-foreground">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1 text-foreground">
                Subject <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={selectClass}
                >
                  <option>General Inquiry</option>
                  <option>Digital Advisory Support</option>
                  <option>Partnership Opportunity</option>
                  <option>Product Information</option>
                </select>
                <SelectArrow />
              </div>
            </div>
          </div>

          {/* State / UT */}
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1 text-foreground">
              State / Union Territory <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className={selectClass}
              >
                <option value="" disabled>Select your state / UT</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <SelectArrow />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1 text-foreground">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="How can we help you today?"
              required
              minLength={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-green py-5 text-sm font-semibold text-white shadow-glow hover:shadow-elegant transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
            <MdSend className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}