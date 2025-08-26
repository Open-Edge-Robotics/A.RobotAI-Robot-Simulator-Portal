import type { ButtonHTMLAttributes } from "react";

import Icon from "../Icon";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: string;
  iconFill?: boolean;
  iconSize?: string;
  iconClassName?: string;
}

export default function IconButton({
  iconName,
  iconFill = false,
  iconSize,
  iconClassName,
  className,
  children,
  ...buttonProps
}: IconButtonProps) {
  return (
    <button className={`flex cursor-pointer items-center ${className}`} {...buttonProps}>
      <Icon name={iconName} fill={iconFill} size={iconSize} className={iconClassName} />
      {children}
    </button>
  );
}
