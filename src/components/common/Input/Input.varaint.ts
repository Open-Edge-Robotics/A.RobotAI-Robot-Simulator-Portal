import { cva } from "class-variance-authority";

const inputVariants = cva(
  "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 rounded-[4px] w-full",
  {
    variants: {
      variant: {},
    },
    defaultVariants: {},
  },
);

export { inputVariants };
