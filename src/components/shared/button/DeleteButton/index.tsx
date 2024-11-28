import { Button, ButtonBaseProps } from "@mui/material";
import React from "react";

const DeleteButton = ({ onClick, disabled }: ButtonBaseProps) => {
  return (
    <Button
      variant="contained"
      color="error"
      onClick={onClick}
      disabled={disabled}
    >
      삭제
    </Button>
  );
};

export default DeleteButton;
