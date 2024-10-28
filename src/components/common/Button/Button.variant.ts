import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer",
  {
    variants: {
      // variant key값 추가 시 Button props로 전달 가능
      variant: {},
      // color key값 추가 시 Button props로 전달 가능
      color: {},
      // size key값 추가 시 Button props로 전달 가능
      size: {},
    },
    defaultVariants: {},
  },
);
