"use client";

import { Button, ButtonProps } from "@mui/material";
import { IoReload } from "react-icons/io5";

const ReloadButton = ({ ...props }: ButtonProps) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Button
      type="button"
      variant="contained"
      color="inherit"
      className="min-w-fit text-sm font-normal"
      onClick={handleReload}
      {...props}
    >
      <IoReload size={18} />
    </Button>
  );
};

export default ReloadButton;
