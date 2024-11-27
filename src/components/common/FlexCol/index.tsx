import { cx } from "class-variance-authority";
import React from "react";

const FlexCol = ({ children, className }: React.HTMLProps<HTMLDivElement>) => {
  return <div className={cx("flex flex-col", className)}>{children}</div>;
};

export default FlexCol;
