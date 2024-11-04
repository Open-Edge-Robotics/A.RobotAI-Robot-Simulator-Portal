"use client";

import Button from "@/components/common/Button";
import {
  selectGroupVariants,
  selectItemVariants,
  selectLabelVariants,
  selecTriggerVariants,
  selectValueTextVariants,
  selectVariants,
} from "@/components/common/Select/Select.variant";
import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/utils/core";
import { VariantProps } from "class-variance-authority";
import React from "react";

type Option = {
  label: string;
  value: string;
};

type SelectProps = VariantProps<typeof selectVariants> & {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onOptionClick?: (value: string) => void;
};

const Select = ({
  children,
  variant,
  className,
  disabled,
  onOptionClick,
}: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectRef = React.useRef<HTMLDivElement>(null);
  const handleOutsideClick = () => setIsOpen(false);

  useClickOutside(selectRef, handleOutsideClick);

  const handleTogleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const selectLabel = React.Children.toArray(children)[0];
  const selectTrigger = React.Children.toArray(children)[1];
  const selectGroup = React.Children.toArray(children)[2];

  const modifiedSelectLabel = React.isValidElement(selectLabel)
    ? React.cloneElement(selectLabel as React.ReactElement<SelectLabelProps>, {
        variant,
      })
    : null;

  const modifiedSelectTrigger = React.isValidElement(selectTrigger)
    ? React.cloneElement(
        selectTrigger as React.ReactElement<SelectTriggerProps>,
        { variant, onClick: handleTogleIsOpen },
      )
    : null;

  const modifiedSelectGroup = React.isValidElement(selectGroup)
    ? React.cloneElement(selectGroup as React.ReactElement<SelectGroupProps>, {
        isOpen,
        variant,
        onGroupClick: handleTogleIsOpen,
        onOptionClick,
      })
    : null;

  return (
    <div
      className={cn(selectVariants({ isOpen, variant, disabled }), className)}
      ref={selectRef}
    >
      {modifiedSelectLabel}
      {modifiedSelectTrigger}
      {modifiedSelectGroup}
    </div>
  );
};

type SelectLabelProps = VariantProps<typeof selectVariants> & {
  children: string;
  isOpen?: boolean;
  className?: string;
};

const SelectLabel = ({ children, variant, className }: SelectLabelProps) => {
  return (
    <label className={cn(selectLabelVariants({ variant }), className)}>
      {children}
    </label>
  );
};

type SelectTriggerProps = VariantProps<typeof selectVariants> & {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onClick?: () => void;
};

const SelectTrigger = ({
  children,
  variant,
  className,
  onClick,
}: SelectTriggerProps) => {
  return (
    <Button
      className={cn(selecTriggerVariants({ variant }), className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

type SelectValueTextProps = VariantProps<typeof selectVariants> & {
  placeholder: string;
  className?: string;
};

const SelectValueText = ({
  placeholder,
  variant,
  className,
}: SelectValueTextProps) => {
  return (
    <span className={cn(selectValueTextVariants({ variant }), className)}>
      {placeholder}
    </span>
  );
};

type SelectGroupProps = VariantProps<typeof selectVariants> & {
  children: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  onGroupClick?: () => void;
  onOptionClick?: (value: string) => void;
};

const SelectGroup = ({
  children,
  isOpen,
  className,
  variant,
  onGroupClick,
  onOptionClick,
}: SelectGroupProps) => {
  return (
    <ul
      className={cn(selectGroupVariants({ isOpen, variant }), className)}
      onClick={onGroupClick}
    >
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement(child as React.ReactElement<SelectItemProps>)
        ) {
          return React.cloneElement(
            child as React.ReactElement<SelectItemProps>,
            { onOptionClick },
          );
        }
      })}
    </ul>
  );
};

type SelectItemProps = VariantProps<typeof selectVariants> & {
  item: Option;
  className?: string;
  onOptionClick?: (value: string) => void;
};

const SelectItem = ({
  item,
  variant,
  className,
  onOptionClick,
}: SelectItemProps) => {
  return (
    <li
      className={cn(selectItemVariants({ variant }), className)}
      onClick={() => onOptionClick?.(item.value)}
    >
      <Button>{item.label}</Button>
    </li>
  );
};

export {
  Select,
  SelectLabel,
  SelectTrigger,
  SelectValueText,
  SelectGroup,
  SelectItem,
};
