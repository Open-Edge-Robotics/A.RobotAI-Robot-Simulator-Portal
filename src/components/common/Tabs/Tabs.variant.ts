import { cva } from "class-variance-authority";

const tabsVariants = cva("", {
  variants: {
    variant: {
      primary: "",
    },
  },
  defaultVariants: {},
});

const tabTriggerListVariants = cva("", {
  variants: {
    variant: {
      primary: "",
    },
  },
  defaultVariants: {},
});

const tabContentListVariants = cva("", {
  variants: {
    variant: {
      primary: "",
    },
  },
  defaultVariants: {},
});

const tabTriggerVariants = cva("", {
  variants: {
    variant: {
      primary: "",
    },
    isActive: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {},
});

const tabContentVariants = cva("", {
  variants: {
    variant: {
      primary: "",
    },
  },
  defaultVariants: {},
});

export {
  tabsVariants,
  tabTriggerListVariants,
  tabContentListVariants,
  tabTriggerVariants,
  tabContentVariants,
};
