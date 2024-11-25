import { create } from "zustand";
import { ToastVariant } from "@/components/common/Toast";

type ToastState = {
  isVisible: boolean;
  message: string;
  variant: ToastVariant;
  duration: number;
  showToast: (
    message: string,
    variant: ToastVariant,
    duration?: number,
  ) => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  isVisible: false,
  message: "",
  variant: "normal",
  duration: 3000,
  showToast: (message, variant, duration = 3000) =>
    set({ isVisible: true, message, variant, duration }),
  hideToast: () => set({ isVisible: false }),
}));
