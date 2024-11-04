import { cva } from "class-variance-authority";

const tabsVariants = cva("", {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

const tabTriggerListVariants = cva("", {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

const tabContentListVariants = cva("", {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

const tabTriggerVariants = cva("", {
  variants: {
    variant: {},
    isActive: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {},
});

const tabContentVariants = cva("", {
  variants: {
    variant: {},
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
