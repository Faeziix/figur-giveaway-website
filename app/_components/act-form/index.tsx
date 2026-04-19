"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";
import { Sparkles } from "@/app/_components/shared/sparkles";
import type { EntryFormData } from "@/app/_types";

type FieldKey = keyof EntryFormData;

interface StepConfig {
  field: FieldKey;
  question: string;
  hint?: string;
  type: "text" | "email" | "tel" | "choice";
  placeholder?: string;
  options?: { value: string; label: string }[];
  validate: (val: string) => string | undefined;
}

const STEPS: StepConfig[] = [
  {
    field: "firstName",
    question: "What's your first name?",
    type: "text",
    placeholder: "Type here…",
    validate: (v) => (!v.trim() ? "This field is required" : undefined),
  },
  {
    field: "lastName",
    question: "And your last name?",
    type: "text",
    placeholder: "Type here…",
    validate: (v) => (!v.trim() ? "This field is required" : undefined),
  },
  {
    field: "email",
    question: "Your email address?",
    hint: "We'll send your prize here.",
    type: "email",
    placeholder: "name@example.com",
    validate: (v) => {
      if (!v.trim()) return "This field is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
      return undefined;
    },
  },
  {
    field: "phone",
    question: "Your mobile number?",
    hint: "International format accepted.",
    type: "tel",
    placeholder: "+971 50 000 0000",
    validate: (v) => (v.trim().length < 5 ? "Please enter your mobile number" : undefined),
  },
  {
    field: "residency",
    question: "Are you based in the UAE?",
    type: "choice",
    options: [
      { value: "resident", label: "UAE Resident" },
      { value: "tourist", label: "Tourist / Visitor" },
    ],
    validate: (v) => (!v ? "Please choose one" : undefined),
  },
  {
    field: "preferredLanguage",
    question: "Which language do you prefer?",
    type: "choice",
    options: [
      { value: "english", label: "English" },
      { value: "arabic", label: "Arabic — عربي" },
    ],
    validate: (v) => (!v ? "Please choose one" : undefined),
  },
  {
    field: "figurPurpose",
    question: "What brings you to Figur?",
    type: "choice",
    options: [
      { value: "personal", label: "Personal treat" },
      { value: "gift", label: "Gift for someone" },
      { value: "corporate", label: "Corporate gifting" },
      { value: "occasion", label: "Special occasion" },
      { value: "exploring", label: "Just exploring" },
    ],
    validate: (v) => (!v ? "Please choose one" : undefined),
  },
];

type FormValues = Record<FieldKey, string>;

const INITIAL_VALUES: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  residency: "",
  preferredLanguage: "",
  figurPurpose: "",
};

const stepVariants = {
  enter: (dir: number) => ({ y: dir > 0 ? 52 : -52, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir: number) => ({ y: dir > 0 ? -52 : 52, opacity: 0 }),
};

interface ActFormProps {
  onSubmitted: (data: EntryFormData) => void;
}

export function ActForm({ onSubmitted }: ActFormProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [fieldError, setFieldError] = useState<string | undefined>();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;
  const progressPct = ((stepIndex + 1) / STEPS.length) * 100;

  useEffect(() => {
    if (step.type !== "choice") {
      const t = setTimeout(() => inputRef.current?.focus(), 380);
      return () => clearTimeout(t);
    }
  }, [stepIndex, step.type]);

  const submit = useCallback(async (finalValues: FormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    try {
      await axios.post("/api/check-duplicate", { email: finalValues.email });
      onSubmitted(finalValues as EntryFormData);
    } catch (err: any) {
      setServerError(
        err.response?.status === 409
          ? "This email has already entered. Check your inbox for your prize."
          : "Something went wrong. Please try again."
      );
      setIsSubmitting(false);
    }
  }, [onSubmitted]);

  const advance = useCallback(async () => {
    const val = values[step.field] ?? "";
    const err = step.validate(val);
    if (err) { setFieldError(err); return; }
    setFieldError(undefined);

    if (isLastStep) {
      await submit(values);
    } else {
      setDirection(1);
      setStepIndex((i) => i + 1);
    }
  }, [values, step, isLastStep, submit]);

  const goBack = useCallback(() => {
    if (stepIndex === 0) return;
    setDirection(-1);
    setStepIndex((i) => i - 1);
    setFieldError(undefined);
    setServerError(null);
  }, [stepIndex]);

  const handleChoiceSelect = useCallback((value: string) => {
    const updated = { ...values, [step.field]: value };
    setValues(updated);
    setFieldError(undefined);

    setTimeout(async () => {
      if (isLastStep) {
        await submit(updated);
      } else {
        setDirection(1);
        setStepIndex((i) => i + 1);
      }
    }, 260);
  }, [values, step.field, isLastStep, submit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [step.field]: e.target.value }));
    setFieldError(undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { e.preventDefault(); advance(); }
  };

  return (
    <section
      className="relative min-h-dvh flex flex-col overflow-hidden"
      style={{ background: "oklch(0.975 0.012 60)" }}
    >
      <Sparkles count={6} />

      {/* Progress bar */}
      <div className="relative z-10 w-full h-[3px] bg-[--color-plum]/10">
        <motion.div
          className="h-full bg-[--color-butter]"
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-5">
        <AnimatePresence>
          {stepIndex > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
              onClick={goBack}
              className="flex items-center gap-1.5 text-[--color-ink-soft] text-sm font-body hover:text-[--color-plum] transition-colors"
            >
              ← Back
            </motion.button>
          )}
        </AnimatePresence>
        <span className="ml-auto font-body text-[--color-ink-soft] text-xs tabular-nums">
          <span className="text-[--color-plum-deep] font-medium">{stepIndex + 1}</span>
          <span className="opacity-40"> / {STEPS.length}</span>
        </span>
      </div>

      {/* Step */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={stepIndex}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              {/* Question */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-body text-[--color-butter] text-xs tracking-[0.15em] uppercase tabular-nums">
                    {String(stepIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[--color-butter]/50 text-xs">→</span>
                </div>
                <h2
                  className="font-display text-[--color-plum-deep] leading-[1.05] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(2.25rem, 1.5rem + 3.5vw, 4rem)" }}
                >
                  {step.question}
                </h2>
                {step.hint && (
                  <p className="font-decorative italic text-[--color-ink-soft] text-base">
                    {step.hint}
                  </p>
                )}
              </div>

              {/* Input */}
              {step.type !== "choice" ? (
                <div className="space-y-10">
                  <div className="relative pb-1">
                    <input
                      ref={inputRef}
                      type={step.type}
                      value={values[step.field]}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder={step.placeholder}
                      autoComplete="off"
                      className="
                        w-full bg-transparent outline-none
                        border-b-2 border-[--color-plum]/15 focus:border-[--color-butter]
                        font-display text-[--color-plum-deep]
                        text-2xl md:text-3xl pb-3
                        placeholder:text-[--color-plum]/20
                        transition-colors duration-300
                      "
                    />
                    <AnimatePresence>
                      {fieldError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute -bottom-6 left-0 text-xs font-body text-red-500"
                        >
                          {fieldError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={advance}
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 bg-[--color-butter] text-[--color-plum-deep] font-body font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[--color-honey] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                    >
                      {isSubmitting ? "Checking…" : isLastStep ? "Submit" : "OK"}
                      {!isSubmitting && <span>↵</span>}
                    </motion.button>
                    <span className="font-body text-[--color-plum]/30 text-xs">
                      press{" "}
                      <kbd className="font-mono bg-[--color-plum]/8 border border-[--color-plum]/10 px-1.5 py-0.5 rounded-md text-[--color-plum-deep]/50 text-[10px]">
                        Enter
                      </kbd>
                    </span>
                    {serverError && (
                      <p className="text-sm font-body text-red-500">{serverError}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {step.options!.map((opt, i) => {
                    const selected = values[step.field] === opt.value;
                    return (
                      <motion.button
                        key={opt.value}
                        onClick={() => handleChoiceSelect(opt.value)}
                        disabled={isSubmitting}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.055, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={!selected ? { x: 4 } : {}}
                        whileTap={{ scale: 0.985 }}
                        className={`
                          w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left
                          transition-all duration-200 group
                          ${selected
                            ? "bg-[--color-butter] border-[--color-butter] shadow-sm"
                            : "bg-white/50 border-[--color-plum]/10 hover:border-[--color-butter]/50 hover:bg-[--color-butter]/6"
                          }
                        `}
                      >
                        <span
                          className={`
                            w-7 h-7 rounded-lg flex items-center justify-center
                            text-[11px] font-mono font-semibold flex-shrink-0
                            transition-colors duration-200
                            ${selected
                              ? "bg-[--color-plum-deep]/15 text-[--color-plum-deep]"
                              : "bg-[--color-plum]/8 text-[--color-plum]/50 group-hover:bg-[--color-butter]/30 group-hover:text-[--color-plum-deep]"
                            }
                          `}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span
                          className={`font-body text-base transition-colors duration-200 ${
                            selected ? "text-[--color-plum-deep] font-medium" : "text-[--color-plum-deep]/80"
                          }`}
                        >
                          {opt.label}
                        </span>
                        {selected && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="ml-auto text-[--color-plum-deep]/50 text-sm"
                          >
                            ✓
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                  {serverError && (
                    <p className="text-sm font-body text-red-500 bg-red-50 rounded-xl p-3 text-center mt-4">
                      {serverError}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
