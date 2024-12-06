"use client";

import { useEffect } from "react";
import { VariantProps } from "class-variance-authority";
import { toastVariants } from "@/components/common/Toast/Toast.variant";
import {
  IoCheckmarkCircleOutline,
  IoInformationCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";

export type ToastVariant = NonNullable<
  VariantProps<typeof toastVariants>["variant"]
>;

type ToastProps = {
  message: string;
  variant: ToastVariant;
  duration?: number;
  onClose: () => void;
};

export type AnimateDuration = "1000" | "2000" | "3000";

const Toast = ({ message, variant, duration = 3000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="w-88 text-black-950shadow-lg fixed right-3 top-1/4 z-50 rounded-lg border-[1px] border-gray-300 bg-white p-4">
      <div className="mb-2 flex items-center gap-2">
        {variant === "normal" && (
          <IoInformationCircleOutline color="#676b73" size={20} />
        )}
        {variant === "success" && (
          <IoCheckmarkCircleOutline color="#4d7aaa" size={20} />
        )}
        {variant === "warning" && (
          <IoWarningOutline color="#ef4444" size={20} />
        )}
        <span>{message}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={toastVariants({
            variant,
            duration: `${duration}` as AnimateDuration,
          })}
        />
      </div>
    </div>
  );
};

export default Toast;
