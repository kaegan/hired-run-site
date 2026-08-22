import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Five variants form one ladder, from "the machine is confident" to
 * "the machine hasn't looked yet" — solid fill, tint, outline, neutral
 * outline, dashed. The shape carries the meaning, not just the hue, so
 * it still reads when green's visual weight shifts between themes.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-semibold whitespace-nowrap leading-none",
  {
    variants: {
      variant: {
        solid: "bg-primary-solid text-primary-solid-foreground",
        surface: "bg-primary-surface text-primary-surface-foreground",
        line: "border border-primary-line bg-transparent text-primary",
        outline: "border border-border bg-transparent text-muted-foreground",
        dashed:
          "border border-dashed border-border bg-transparent text-muted-foreground",
      },
      size: {
        default: "px-2.5 py-1 text-[11px]",
        sm: "px-2 py-[2px] text-[10px]",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
