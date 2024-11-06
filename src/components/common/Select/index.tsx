"use client";

import React from "react";
import { VariantProps } from "class-variance-authority";
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

type SelectContextValue = VariantProps<typeof selectVariants> & {
  isOpen: boolean;
  handleToggleIsOpen: () => void;
  selectedValue: string | null;
  handleSelectOption: (value: string) => void;
};

const SelectContext = React.createContext<SelectContextValue | undefined>(
  undefined,
);

type SelectProps = VariantProps<typeof selectVariants> & {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Select = ({ children, variant, className, disabled }: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  const selectRef = React.useRef<HTMLDivElement>(null);
  const handleOutsideClick = () => setIsOpen(false);

  useClickOutside(selectRef, handleOutsideClick);

  const handleToggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectOption = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{
        isOpen,
        variant,
        selectedValue,
        handleToggleIsOpen,
        handleSelectOption,
      }}
    >
      <div
        className={cn(selectVariants({ isOpen, variant, disabled }), className)}
        ref={selectRef}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
};

type SelectLabelProps = {
  children: string;
  className?: string;
};

const SelectLabel = ({ children, className }: SelectLabelProps) => {
  const context = React.useContext(SelectContext);
  if (!context)
    throw new Error(
      "SelectContext is undefined. Ensure that Tabs component is used as a parent component.",
    );
  const { variant } = context;

  return (
    <label className={cn(selectLabelVariants({ variant }), className)}>
      {children}
    </label>
  );
};

type SelectTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

const SelectTrigger = ({ children, className }: SelectTriggerProps) => {
  const context = React.useContext(SelectContext);
  if (!context)
    throw new Error(
      "SelectContext is undefined. Ensure that Tabs component is used as a parent component.",
    );
  const { variant, handleToggleIsOpen } = context;

  return (
    <Button
      className={cn(selecTriggerVariants({ variant }), className)}
      onClick={handleToggleIsOpen}
    >
      {children}
    </Button>
  );
};

type SelectValueTextProps = {
  placeholder: string;
  className?: string;
};

const SelectValueText = ({ placeholder, className }: SelectValueTextProps) => {
  const context = React.useContext(SelectContext);
  if (!context)
    throw new Error(
      "SelectContext is undefined. Ensure that Tabs component is used as a parent component.",
    );
  const { variant } = context;

  return (
    <span className={cn(selectValueTextVariants({ variant }), className)}>
      {placeholder}
    </span>
  );
};

type SelectGroupProps = {
  children: React.ReactNode;
  className?: string;
};

const SelectGroup = ({ children, className }: SelectGroupProps) => {
  const context = React.useContext(SelectContext);
  if (!context)
    throw new Error(
      "SelectContext is undefined. Ensure that Tabs component is used as a parent component.",
    );
  const { isOpen, variant } = context;

  return (
    <ul className={cn(selectGroupVariants({ isOpen, variant }), className)}>
      {children}
    </ul>
  );
};

type SelectItemProps = {
  children: React.ReactNode;
  value: string;
  className?: string;
};

const SelectItem = ({ value, className, children }: SelectItemProps) => {
  const context = React.useContext(SelectContext);
  if (!context)
    throw new Error(
      "SelectContext is undefined. Ensure that Tabs component is used as a parent component.",
    );
  const { variant, handleSelectOption } = context;

  return (
    <li
      className={cn(selectItemVariants({ variant }), className)}
      onClick={() => handleSelectOption(value)}
    >
      <Button>{children}</Button>
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
