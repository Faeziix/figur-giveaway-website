"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import posthog from "posthog-js";
import { Sparkles } from "@/app/_components/shared/sparkles";
import { PhoneInput } from "@/app/_components/shared/phone-input";
import type { EntryFormData } from "@/app/_types";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

interface ActFormProps {
  onSubmitted: (data: EntryFormData) => void;
}

export function ActForm({ onSubmitted }: ActFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState<"english" | "arabic">("english");
  const [visitorType, setVisitorType] = useState<"resident" | "tourist">("resident");
  const [errors, setErrors] = useState<FormErrors>({});

  const lastNameRef = useRef<HTMLInputElement>(null);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!firstName.trim()) errs.firstName = "Required";
    if (!lastName.trim()) errs.lastName = "Required";
    const phoneDigits = phone.replace(/\D/g, "");
    const isUAE = phoneDigits.startsWith("971");
    if (isUAE ? phoneDigits.length !== 12 : phoneDigits.length < 7) {
      errs.phone = isUAE ? "UAE numbers must be 9 digits after +971" : "Enter a valid phone number";
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Enter a valid email address";
    }
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    posthog.capture("form_submitted", { has_email: !!email.trim(), preferred_language: preferredLanguage, visitor_type: visitorType });

    onSubmitted({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone,
      email: email.trim() || undefined,
      preferredLanguage,
      visitorType,
    });
  }

  const fieldClass = (hasError: boolean) =>
    `w-full bg-white/60 border rounded-2xl px-5 py-4 font-body text-plum-deep text-base outline-none transition-all duration-200 placeholder:text-plum/30 ${
      hasError
        ? "border-red-400 focus:border-red-400"
        : "border-plum/10 focus:border-butter focus:bg-white/90"
    }`;

  return (
    <section
      className="relative min-h-dvh flex flex-col items-center justify-center px-6 py-16 overflow-hidden"
      style={{ background: "oklch(0.975 0.012 60)" }}
    >
      <Sparkles count={6} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-10 space-y-2 text-center">
          <span className="font-body text-butter text-xs tracking-[0.2em] uppercase">
            Figùr Giveaway
          </span>
          <h2
            className="font-display text-plum-deep leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.25rem, 1.5rem + 3.5vw, 3.5rem)" }}
          >
            Enter to Win
          </h2>
          <p className="font-decorative italic text-ink-soft text-base">
            One lucky winner. Truly yours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <input
                type="text"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); setErrors((p) => ({ ...p, firstName: undefined })); }}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); lastNameRef.current?.focus(); } }}
                placeholder="First name"
                autoComplete="given-name"
                className={fieldClass(!!errors.firstName)}
              />
              {errors.firstName && (
                <p className="text-xs font-body text-red-500 pl-1">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <input
                ref={lastNameRef}
                type="text"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); setErrors((p) => ({ ...p, lastName: undefined })); }}
                placeholder="Last name"
                autoComplete="family-name"
                className={fieldClass(!!errors.lastName)}
              />
              {errors.lastName && (
                <p className="text-xs font-body text-red-500 pl-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <PhoneInput
            value={phone}
            onChange={(v) => { setPhone(v); setErrors((p) => ({ ...p, phone: undefined })); }}
            error={errors.phone}
          />

          <div className="space-y-1.5">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                placeholder="Email address"
                autoComplete="email"
                className={fieldClass(!!errors.email)}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-xs text-plum/30 pointer-events-none">
                optional
              </span>
            </div>
            {errors.email && (
              <p className="text-xs font-body text-red-500 pl-1">{errors.email}</p>
            )}
          </div>

          <div className="bg-white/60 border border-plum/10 rounded-2xl p-1.5 flex">
            {(["english", "arabic"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setPreferredLanguage(lang)}
                className={`flex-1 py-3 rounded-xl font-body text-sm font-medium transition-all duration-200 ${
                  preferredLanguage === lang
                    ? "bg-plum text-cream shadow-sm"
                    : "text-plum/50 hover:text-plum-deep"
                }`}              >
                {lang === "english" ? "English" : "عربي"}
              </button>
            ))}
          </div>

          <div className="bg-white/60 border border-plum/10 rounded-2xl p-1.5 flex">
            {(["resident", "tourist"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setVisitorType(type)}
                className={`flex-1 py-3 rounded-xl font-body text-sm font-medium transition-all duration-200 ${
                  visitorType === type
                    ? "bg-plum text-cream shadow-sm"
                    : "text-plum/50 hover:text-plum-deep"
                }`}
              >
                {type === "resident" ? "Resident" : "Tourist"}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <motion.button
              type="submit"
              className="w-full bg-plum text-cream font-body font-semibold text-base py-4 rounded-2xl hover:bg-plum-deep transition-colors"
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.975 }}
              transition={{ duration: 0.15 }}
            >
              Enter Giveaway →
            </motion.button>
          </div>

          <p className="text-center font-body text-xs text-ink-soft/50 pt-1">
            By entering, you agree to our terms.
          </p>
        </form>
      </motion.div>
    </section>
  );
}
