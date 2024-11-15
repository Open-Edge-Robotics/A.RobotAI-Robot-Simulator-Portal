import { Typography } from "@mui/material";
import React from "react";

type PageTitleProps = {
  children: React.ReactNode;
  className?: string;
};

const PageTitle = ({ children, className }: PageTitleProps) => {
  return (
    <Typography variant="h6" className={className}>
      {children}
    </Typography>
  );
};

export default PageTitle;
