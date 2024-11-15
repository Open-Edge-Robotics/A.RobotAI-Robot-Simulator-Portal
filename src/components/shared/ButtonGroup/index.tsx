import React from "react";
import { Button } from "@mui/material";

const ButtonGroup = () => {
  return (
    <div className="flex gap-2">
      <Button variant="contained" className="bg-blue-400">
        생성
      </Button>
      <Button variant="contained" className="bg-blue-400">
        실행
      </Button>
    </div>
  );
};

export default ButtonGroup;
