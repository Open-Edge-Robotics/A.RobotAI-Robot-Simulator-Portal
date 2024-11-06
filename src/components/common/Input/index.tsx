import React from "react";
import { VariantProps } from "class-variance-authority";
import { inputVariants } from "@/components/common/Input/Input.varaint";
import { cn } from "@/utils/core";

type InputProps = React.ComponentPropsWithoutRef<"input"> &
  VariantProps<typeof inputVariants>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, className, ...props }: InputProps, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
