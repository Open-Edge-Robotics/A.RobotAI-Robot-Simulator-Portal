import { IconButton } from "@mui/material";
import React from "react";
import { GoKebabHorizontal } from "react-icons/go";

type KebabButtonProps = {
  id: string;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => void;
};

const KebabButton = ({ id, onClick }: KebabButtonProps) => {
  return (
    <IconButton onClick={(e) => onClick(e, id)}>
      <GoKebabHorizontal color="#000000" />
    </IconButton>
  );
};

export default KebabButton;
