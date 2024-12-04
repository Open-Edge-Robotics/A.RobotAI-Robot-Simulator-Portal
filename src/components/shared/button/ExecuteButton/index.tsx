import { Button, ButtonBaseProps } from "@mui/material";

const ExecuteButton = ({ onClick, disabled }: ButtonBaseProps) => {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={onClick}
      disabled={disabled}
      className="bg-green-400 hover:bg-green-500 disabled:bg-gray-400 disabled:text-white"
    >
      실행
    </Button>
  );
};

export default ExecuteButton;
