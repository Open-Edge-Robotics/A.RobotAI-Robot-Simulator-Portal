import { Button } from "@mui/material";
import React from "react";

const SearchButton = () => {
  return (
    <Button
      variant="contained"
      type="submit"
      color="inherit"
      className="text-sm font-normal"
    >
      검색
    </Button>
  );
};

export default SearchButton;
