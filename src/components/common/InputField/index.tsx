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
import FlexCol from "@/components/common/FlexCol";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  errors?: FieldErrors<T>;
  register: UseFormRegister<T>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = <T extends FieldValues>({
  name,
  label,
  errors,
  register,
  ...props
}: Props<T>) => {
  const errorMessage = errors?.[name]?.message;

  return (
    <FlexCol className="items-centers relative w-full justify-center gap-1 pb-5">
      <Label className="w-28 text-nowrap">{label}</Label>
      <Input
        className={cx(
          "w-full border border-gray-300 px-4 py-2 text-sm placeholder:text-sm",
          errorMessage && "border-green-500",
        )}
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
    </FlexCol>
  );
};

export default InputField;
