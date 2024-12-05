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
      className="px-2 py-2 text-sm font-normal"
      onClick={handleReload}
      {...props}
    >
      <IoReload width={16} height={16} />
    </Button>
  );
};

export default ReloadButton;
