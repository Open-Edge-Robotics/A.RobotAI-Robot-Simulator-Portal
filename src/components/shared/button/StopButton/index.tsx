import { Button, ButtonBaseProps } from "@mui/material";

const StopButton = ({ onClick, disabled }: ButtonBaseProps) => {
  return (
    <Button
      variant="contained"
      className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 disabled:text-white"
      onClick={onClick}
      disabled={disabled}
    >
      중지
    </Button>
  );
};

export default StopButton;
