import { buttonVariants } from "@/components/common/Button/Button.variant";
import { cn } from "@/utils/core";
import { VariantProps } from "class-variance-authority";
import React from "react";

type ButtonProps = VariantProps<typeof buttonVariants> &
  React.ComponentPropsWithoutRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, color, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export default Button;
