"use client";

import { cn } from "@/lib/cn";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="font-body font-medium text-[length:--text-caption] text-ink-soft tracking-wide uppercase"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "h-12 w-full rounded-xl bg-cream-peach text-ink font-body text-sm px-4",
          "border border-plum/10 outline-none",
          "transition-all duration-200",
          "focus:border-butter focus:ring-4 focus:ring-butter/20",
          "placeholder:text-ink-soft/40",
          error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs font-body">{error}</p>
      )}
    </div>
  )
);

Input.displayName = "Input";

export { Input };
