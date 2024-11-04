import { cva } from "class-variance-authority";

export const typographyVariants = cva("", {
  variants: {
    color: {
      primary: "",
      secondary: "",
      success: "",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    font: {
      primary: "",
      secondary: "",
    },
  },
  defaultVariants: {
    color: "primary",
    align: "left",
    font: "primary",
  },
});
