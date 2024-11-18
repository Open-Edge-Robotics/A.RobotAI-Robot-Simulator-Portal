import React from "react";
import { Button } from "@mui/material";

const ButtonGroup = () => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outlined"
        className="border-emerald-600 bg-emerald-200 text-sm text-black-950"
      >
        생성
      </Button>
      <Button
        variant="outlined"
        className="border-navy-600 bg-navy-400 text-sm text-black-950"
      >
        실행
      </Button>
    </div>
  );
};

export default ButtonGroup;
