import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { cx } from "class-variance-authority";
import { Label } from "@/components/common/Label";
import { Input } from "@/components/common/Input";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  maxLength: number;
  errors?: FieldErrors<T>;
  register: UseFormRegister<T>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = <T extends FieldValues>({
  name,
  label,
  maxLength,
  placeholder,
  errors,
  register,
  ...props
}: Props<T>) => {
  const errorMessage = errors?.[name]?.message;

  return (
    <div className="items-centers relative flex w-full flex-col justify-center gap-1 pb-5">
      <Label className="w-28 text-nowrap">{label}</Label>
      <Input
        className={cx(
          "w-full border border-gray-300 px-4 py-2 text-sm placeholder:text-sm",
          errorMessage && "border-green-500",
        )}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete="off"
        {...props}
        {...register(name)}
      />
      {errorMessage && (
        <span className="absolute bottom-0 text-xs text-green-500">
          {typeof errorMessage === "string"
            ? errorMessage
            : String(errorMessage)}
        </span>
      )}
    </div>
  );
};

export default InputField;
