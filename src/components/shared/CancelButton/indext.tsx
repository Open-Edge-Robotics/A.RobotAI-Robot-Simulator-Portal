import { Button, ButtonProps } from "@mui/material";
import React from "react";

type Props = {} & ButtonProps;

const CancelButton = ({ ...props }: Props) => {
  return (
    <Button variant="outlined" color="info" type="button" {...props}>
      취소
    </Button>
  );
};

export default CancelButton;
