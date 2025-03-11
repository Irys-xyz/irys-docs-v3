import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const headingVariants = cva(
  "font-skrappa uppercase tracking-[0.02em]",
  {
    variants: {
      size: {
        huge:
          "text-[56px] md:text-[144px] leading-[90%] tracking-[0.02em] md:tracking-[0%]",
        xlarge: "text-[40px] md:text-[96px] leading-[95%] tracking-[0.02em]",
        large:
          "text-[40px] md:text-[88px] leading-[90%] md:leading-[95%] tracking-[0.02em]",
        big:
          "text-[40px] md:text-[72px] leading-[90%] md:leading-[95%] tracking-[0.02em]",
        medium:
          "text-[36px] md:text-[56px] leading-[95%] md:leading-[90%] tracking-[0.02em]",
      },
      weight: {
        wide: "font-skrappa",
        narrow: "font-skrappaNarrow",
        reasonable: "font-skrappaReasonable",
      },
    },
    defaultVariants: {
      size: "medium",
      weight: "reasonable",
    },
  },
);

interface HeadingProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function Heading({
  className,
  size,
  weight,
  as: Component = "h2",
  children,
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn(headingVariants({ size, weight }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
