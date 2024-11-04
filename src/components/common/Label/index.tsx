import React from "react";
import { VariantProps } from "class-variance-authority";
import { labelVariants } from "@/components/common/Label/Label.variant";
import { cn } from "@/utils/core";

type LabelProps = React.ComponentPropsWithoutRef<"label"> &
  VariantProps<typeof labelVariants> & {
    className?: string;
  };

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }: LabelProps, ref) => {
    return (
      <label className={cn(labelVariants(), className)} ref={ref} {...props} />
    );
  },
);

Label.displayName = "Label";
