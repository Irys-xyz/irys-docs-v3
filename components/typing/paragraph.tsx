import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const paragraphVariants = cva(
  "font-gtPressura leading-[115%]",
  {
    variants: {
      size: {
        big: "text-[18px] md:text-[20px]",
        medium: "text-[16px] md:text-[18px]",
        small: "text-[14px] md:text-[16px]",
        caps: "text-[14px] leading-[95%] tracking-[0.05em] uppercase",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

interface ParagraphProps
  extends
    React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  children?: React.ReactNode;
}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(paragraphVariants({ size, className }))}
        {...props}
      >
        {children}
      </p>
    );
  },
);

Paragraph.displayName = "Paragraph";

export default Paragraph;
