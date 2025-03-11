import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const textVariants = cva(
  "font-pressura font-normal",
  {
    variants: {
      size: {
        big: "text-[20px] leading-[115%] tracking-[0%]",
        medium: "text-[18px] leading-[115%] tracking-[0%]",
        small: "text-[16px] leading-[115%] tracking-[0%]",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
);

interface TextProps
  extends
    React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

export function Text({
  className,
  size,
  as: Component = "p",
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants({ size }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
