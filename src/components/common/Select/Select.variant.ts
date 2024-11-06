import { cva } from "class-variance-authority";

const selectVariants = cva("whitespace-nowrap cursor-pointer", {
  variants: {
    isOpen: {
      true: "",
      false: "",
    },
    variant: {
      primary: "",
    },
    disabled: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {},
});

const selectLabelVariants = cva("", {
  variants: {
    variant: {
      primary: "",
    },
  },
  defaultVariants: {},
});

const selecTriggerVariants = cva("", {
  variants: {
    variant: {
      primary: "",
    },
  },
  defaultVariants: {},
});

const selectValueTextVariants = cva("", {
  variants: {
    variant: {
      primary: "",
    },
  },
  defaultVariants: {},
});

const selectGroupVariants = cva("", {
  variants: {
    isOpen: {
      true: "visible",
      false: "invisible",
    },
    variant: {
      primary: "",
    },
  },
  defaultVariants: {},
});

const selectItemVariants = cva("", {
  variants: {
    variant: {
      primary: "",
    },
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
