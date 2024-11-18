import { Button, ButtonBaseProps } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
} & ButtonBaseProps;

const ExecuteButton = ({ onClick, disabled }: Props) => {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={onClick}
      disabled={disabled}
      className="bg-green-400 hover:bg-green-500"
    >
      실행
    </Button>
  );
};

export default ExecuteButton;
