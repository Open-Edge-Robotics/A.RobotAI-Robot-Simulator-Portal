import { cva } from "class-variance-authority";

const selectVariants = cva("whitespace-nowrap cursor-pointer", {
  variants: {
    isOpen: {
      true: "",
      false: "",
    },
    variant: {},
    disabled: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {},
});

const selectLabelVariants = cva("", {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

const selecTriggerVariants = cva("", {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

const selectValueTextVariants = cva("", {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

const selectGroupVariants = cva("", {
  variants: {
    isOpen: {
      true: "visible",
      false: "invisible",
    },
    variant: {},
  },
  defaultVariants: {},
});

const selectItemVariants = cva("", {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

export {
  selectVariants,
  selectLabelVariants,
  selecTriggerVariants,
  selectValueTextVariants,
  selectGroupVariants,
  selectItemVariants,
};
