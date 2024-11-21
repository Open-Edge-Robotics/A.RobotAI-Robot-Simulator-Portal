import { Button } from "@mui/material";
import React from "react";

const SearchButton = () => {
  return (
    <Button
      variant="outlined"
      type="submit"
      className="border-emerald-500 bg-emerald-300 text-black-950 hover:bg-emerald-400"
    >
      검색
    </Button>
  );
};

export default SearchButton;
