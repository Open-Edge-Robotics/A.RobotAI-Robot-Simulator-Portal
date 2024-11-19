import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Label } from "@/components/common/Label";
import { Input } from "@/components/common/Input";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder: string;
  maxLength: number;
  register: UseFormRegister<T>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = <T extends FieldValues>({
  name,
  label,
  maxLength,
  placeholder,
  register,
  ...props
}: Props<T>) => {
  return (
    <div className="items-centers flex w-full flex-col justify-center gap-2">
      <Label className="w-28 text-nowrap">{label}</Label>
      <Input
        className="w-full border border-gray-300 px-4 py-2 text-sm placeholder:text-sm"
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete="off"
        {...props}
        {...register(name)}
      />
    </div>
  );
};

export default InputField;
