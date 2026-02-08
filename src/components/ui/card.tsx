"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered" | "bento";
  hover?: boolean;
  glow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = false, glow = false, children, ...props }, ref) => {
    const baseStyles = "rounded-3xl transition-all duration-500";

    const variants = {
      default: "bg-white/[0.02] border border-white/[0.05]",
      glass: "bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]",
      bordered: "bg-transparent border border-white/[0.08]",
      bento: "bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm",
    };

    const hoverStyles = hover
      ? "hover:border-white/[0.15] hover:bg-white/[0.04] hover:-translate-y-1"
      : "";

    const glowStyles = glow
      ? "shadow-[0_0_50px_rgba(255,255,255,0.03)]"
      : "";

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], hoverStyles, glowStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pb-0", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";
