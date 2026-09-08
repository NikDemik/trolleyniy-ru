import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// shadcn/ui Button (Radix pattern), adapted to the corporate theme.
export const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-none border px-6 py-3 text-center font-sans text-xs font-extrabold leading-5 tracking-[.13em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-silver bg-silver text-ink hover:border-silver-bright hover:bg-silver-bright",
        outline:
          "border-silver/70 bg-transparent text-silver-bright hover:border-silver-bright hover:bg-silver-bright hover:text-ink",
        ghost: "border-transparent hover:border-border hover:bg-muted",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, className }))} {...props} />
  );
}
