import { Button, ButtonBaseProps } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
} & ButtonBaseProps;

const DeleteButton = ({ onClick, disabled }: Props) => {
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
