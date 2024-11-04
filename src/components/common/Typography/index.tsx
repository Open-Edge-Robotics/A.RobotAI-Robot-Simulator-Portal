import React from "react";
import { VariantProps } from "class-variance-authority";
import { typographyVariants } from "@/components/common/Typography/Typography.varaint";
import { cn } from "@/utils/core";

type TypographyTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type TypographyProps<T extends TypographyTags> = VariantProps<
  typeof typographyVariants
> &
  React.ComponentPropsWithRef<T> & {
    tag: T;
    children: React.ReactNode;
    className?: string;
  };

export const Typography = <T extends TypographyTags>({
  tag,
  children,
  color,
  align,
  font,
  className,
  ...props
}: TypographyProps<TypographyTags>) => {
  const Tag = tag;

  return (
    <Tag
      className={cn(typographyVariants({ color, align, font }), className)}
      {...(props as React.ComponentPropsWithoutRef<T>)}
    >
      {children}
    </Tag>
  );
};
