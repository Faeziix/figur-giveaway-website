"use client";

import { cn } from "@/lib/cn";
import { forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options, placeholder, ...props }, ref) => (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="font-body font-medium text-[length:--text-caption] text-ink-soft tracking-wide uppercase"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={id}
          className={cn(
            "h-12 w-full appearance-none rounded-xl bg-cream-peach text-ink font-body text-sm px-4 pr-10",
            "border border-plum/10 outline-none cursor-pointer",
            "transition-all duration-200",
            "focus:border-butter focus:ring-4 focus:ring-butter/20",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-butter text-xs">
          ▾
        </span>
      </div>
      {error && (
        <p className="text-red-500 text-xs font-body">{error}</p>
      )}
    </div>
  )
);

Select.displayName = "Select";

export { Select };
