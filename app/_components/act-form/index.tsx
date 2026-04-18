"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SectionEyebrow } from "@/app/_components/shared/section-eyebrow";
import { Sparkles } from "@/app/_components/shared/sparkles";
import { COUNTRIES } from "@/app/_lib/countries";
import type { EntryFormData } from "@/app/_types";

const formSchema = z.object({
  firstName: z.string().min(1, "Required").max(80).trim(),
  lastName: z.string().min(1, "Required").max(80).trim(),
  email: z.string().min(1, "Required").email("Enter a valid email").toLowerCase().trim(),
  residency: z.enum(["resident", "tourist"], { errorMap: () => ({ message: "Required" }) }),
  nationality: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof formSchema>;

interface ActFormProps {
  onSubmitted: (data: EntryFormData) => void;
}

export function ActForm({ onSubmitted }: ActFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setServerError(null);
    try {
      await axios.post("/api/check-duplicate", { email: values.email });
      onSubmitted(values as EntryFormData);
    } catch (err: any) {
      if (err.response?.status === 409) {
        setServerError("This email has already entered. Check your inbox for your prize.");
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden">
      <Sparkles count={8} />

      <div className="relative z-10 w-full max-w-2xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex flex-col items-center gap-4 flex-shrink-0"
          >
            <Image
              src="/images/pixar/astronaut-wave.png"
              alt="Figur astronaut welcoming you"
              width={200}
              height={250}
            />
            <p className="font-decorative italic text-[--color-ink-soft] text-xs text-center max-w-[140px] leading-relaxed">
              "A gift awaits in Figland…"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full"
          >
            <div className="bg-[--color-cream-peach] rounded-3xl p-8 space-y-8">
              <div className="text-center space-y-3">
                <SectionEyebrow light>Identify Yourself, Traveller</SectionEyebrow>
                <h2
                  className="text-[--color-plum] leading-tight tracking-[-0.03em]"
                  style={{ fontSize: "clamp(1.75rem, 1.25rem + 2.5vw, 2.75rem)" }}
                >
                  Your Details
                </h2>
                <p className="font-body text-[--color-ink-soft] text-sm">
                  One entry per traveller. Your prize will be sent to the email you provide.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="firstName"
                    label="First Name"
                    placeholder="Layla"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                  />
                  <Input
                    id="lastName"
                    label="Last Name"
                    placeholder="Al-Rashidi"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                  />
                </div>

                <Input
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="layla@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <Select
                  id="residency"
                  label="I am a..."
                  placeholder="Select one"
                  error={errors.residency?.message}
                  options={[
                    { value: "resident", label: "UAE Resident" },
                    { value: "tourist", label: "Tourist / Visitor" },
                  ]}
                  {...register("residency")}
                />

                <Select
                  id="nationality"
                  label="Nationality"
                  placeholder="Select your nationality"
                  error={errors.nationality?.message}
                  options={COUNTRIES}
                  {...register("nationality")}
                />

                {serverError && (
                  <p className="text-sm font-body text-red-500 text-center bg-red-50 rounded-xl p-3">
                    {serverError}
                  </p>
                )}

                <div className="h-px bg-gradient-to-r from-transparent via-[--color-butter]/40 to-transparent" />

                <Button
                  type="submit"
                  variant="butter"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Checking…" : "Enter Figland →"}
                </Button>
              </form>

              <p className="text-center font-body text-[--color-ink-soft] text-xs">
                Your details are kept private. One prize per person.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
