"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-body font-semibold tracking-wide text-sm transition-all disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-full active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-dark)] hover:scale-[1.04] shadow-[0_4px_20px_-8px_oklch(0.28_0.12_350/0.4)] hover:shadow-[0_8px_28px_-8px_oklch(0.28_0.12_350/0.5)]",
        butter:
          "bg-[var(--color-butter)] text-[var(--color-plum)] hover:bg-[var(--color-butter-light)] hover:scale-[1.04] shadow-[0_4px_20px_-8px_oklch(0.88_0.14_85/0.5)] hover:shadow-[0_8px_28px_-8px_oklch(0.88_0.14_85/0.7)]",
        ghost:
          "bg-transparent text-[var(--color-plum)] border-2 border-[var(--color-plum)]/20 hover:border-[var(--color-plum)]/40 hover:bg-[var(--color-plum)]/5 hover:scale-[1.04]",
        soft:
          "bg-[var(--color-blush)] text-[var(--color-plum)] hover:bg-[var(--color-cream-peach)] hover:scale-[1.04]",
      },
      size: {
        sm: "h-9 px-5 text-xs",
        md: "h-12 px-8 text-sm",
        lg: "h-14 px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
