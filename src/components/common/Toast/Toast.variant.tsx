import { cva } from "class-variance-authority";

export const toastVariants = cva("h-full origin-left animate-shrink", {
  variants: {
    variant: {
      normal: "bg-gray-500",
      success: "bg-navy-500",
      warning: "bg-red-500",
    },
    duration: {
      "1000": "animate-shrink-1s",
      "2000": "animate-shrink-2s",
      "3000": "animate-shrink-3s",
    },
  },
  defaultVariants: {
    variant: "normal",
    duration: "3000",
  },
});
