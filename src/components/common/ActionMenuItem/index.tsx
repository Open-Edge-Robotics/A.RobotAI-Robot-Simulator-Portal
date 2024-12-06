import { Button, ButtonProps, MenuItem, MenuItemProps } from "@mui/material";
import React from "react";

type ActionMenuItemProps = {
  buttonText: string;
} & ButtonProps &
  MenuItemProps;

const ActionMenuItem = ({
  onClick,
  buttonText,
  ...props
}: ActionMenuItemProps) => (
  <MenuItem
    onClick={onClick}
    sx={{
      padding: "4px",
      fontSize: "14px",
      borderRadius: "4px",
      justifyContent: "center",
    }}
  >
    <Button variant="contained" {...props}>
      {buttonText}
    </Button>
  </MenuItem>
);
export default ActionMenuItem;
