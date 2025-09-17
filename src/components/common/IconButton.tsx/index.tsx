import type { ButtonHTMLAttributes } from "react";

import Icon from "../Icon";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: string;
  iconFill?: boolean;
  iconSize?: string;
  iconClassName?: string;
  iconPosition?: "left" | "right";
}

export default function IconButton({
  iconName,
  iconFill = false,
  iconSize,
  iconClassName,
  className,
  iconPosition = "left",
  children,
  ...buttonProps
}: IconButtonProps) {
  return (
    <button className={`flex cursor-pointer items-center justify-center ${className}`} {...buttonProps} type="button">
      {iconPosition === "left" && <Icon name={iconName} fill={iconFill} size={iconSize} className={iconClassName} />}
      {children}
      {iconPosition === "right" && <Icon name={iconName} fill={iconFill} size={iconSize} className={iconClassName} />}
    </button>
  );
}
