import { cn } from "@/lib/cn";

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export function SectionEyebrow({ children, className, light }: SectionEyebrowProps) {
  return (
    <div className={cn("flex items-center gap-3 justify-center", className)}>
      <span
        className={cn(
          "block h-px w-8 opacity-50",
          light ? "bg-[var(--color-plum-soft)]" : "bg-[var(--color-butter)]"
        )}
      />
      <p
        className={cn(
          "font-display italic tracking-widest text-xs uppercase",
          light ? "text-[var(--color-plum-soft)]" : "text-[var(--color-butter)]"
        )}
      >
        {children}
      </p>
      <span
        className={cn(
          "block h-px w-8 opacity-50",
          light ? "bg-[var(--color-plum-soft)]" : "bg-[var(--color-butter)]"
        )}
      />
    </div>
  );
}
