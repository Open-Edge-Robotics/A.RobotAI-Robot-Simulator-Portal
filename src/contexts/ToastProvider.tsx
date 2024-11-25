"use client";

import Toast from "@/components/common/Toast";
import { useToastStore } from "@/stores/useToastStore";

export function ToastProvider() {
  const { isVisible, message, variant, duration, hideToast } = useToastStore();

  return (
    <>
      {isVisible && (
        <Toast
          message={message}
          variant={variant}
          duration={duration}
          onClose={hideToast}
        />
      )}
    </>
  );
}
