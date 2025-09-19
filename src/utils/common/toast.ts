import { toast } from "react-toastify";

const baseStyle = {
  borderRadius: "8px",
  background: "var(--color-white)",
  color: "var(--color-gray-900)",
};

export const successToast = (message: string) => {
  toast.success(message, {
    style: {
      ...baseStyle,
    },
  });
};

export const errorToast = (message: string) => {
  toast.error(message, {
    style: {
      ...baseStyle,
    },
  });
};

export const infoToast = (message: string) => {
  toast.info(message, {
    style: {
      ...baseStyle,
    },
  });
};

export const warnToast = (message: string) => {
  toast.warn(message, {
    style: {
      ...baseStyle,
    },
  });
};
