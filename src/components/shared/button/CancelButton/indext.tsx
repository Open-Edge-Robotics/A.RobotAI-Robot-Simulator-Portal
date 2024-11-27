import { Button, ButtonProps } from "@mui/material";
import React from "react";

const CancelButton = ({ ...props }: ButtonProps) => {
  return (
    <Button variant="outlined" color="info" type="button" {...props}>
      취소
    </Button>
  );
};

export default CancelButton;
