import { IconButton, IconButtonProps } from "@mui/material";
import React from "react";
import { GoKebabHorizontal } from "react-icons/go";

type KebabButtonProps = {
  id: string;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => void;
} & IconButtonProps;

const KebabButton = ({ id, onClick, ...props }: KebabButtonProps) => {
  return (
    <IconButton onClick={(e) => onClick(e, id)} {...props}>
      <GoKebabHorizontal color="#000000" />
    </IconButton>
  );
};

export default KebabButton;
