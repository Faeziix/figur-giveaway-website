import { cva, type VariantProps } from "class-variance-authority";
import NextLink from "next/link";
import { cn } from "@/lib/cn";

const linkVariants = cva("transition-colors duration-200 cursor-pointer", {
  variants: {
    variant: {
      default: "text-[--color-accent] hover:text-[--color-accent-light] underline underline-offset-4",
      nav: "text-[--color-text-inverse] hover:text-[--color-accent] no-underline font-decorative tracking-widest uppercase text-sm",
      ghost: "text-[--color-text-muted] hover:text-[--color-text] no-underline",
    },
  },
  defaultVariants: { variant: "default" },
});

interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string;
  external?: boolean;
}

export function Link({ href, variant, className, external, children, ...props }: LinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(linkVariants({ variant }), className)}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} className={cn(linkVariants({ variant }), className)} {...props}>
      {children}
    </NextLink>
  );
}
