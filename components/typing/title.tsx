import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const titleVariants = cva(
  "font-skrappa uppercase tracking-[0.02em]",
  {
    variants: {
      size: {
        small: "text-[32px] md:text-[40px] leading-[95%]",
        xsmall: "text-[28px] md:text-[32px] leading-[105%]",
        xxsmall: "text-[24px] md:text-[28px] leading-[95%]",
      },
      weight: {
        wide: "font-skrappaWide",
        narrow: "font-skrappaNarrow",
        reasonable: "font-skrappaReasonable",
      },
    },
    defaultVariants: {
      size: "small",
      weight: "narrow",
    },
  },
);

interface TitleProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function Title({
  className,
  size,
  weight,
  as: Component = "h3",
  children,
  ...props
}: TitleProps) {
  return (
    <Component
      className={cn(titleVariants({ size, weight }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
