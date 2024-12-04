import { Button, ButtonBaseProps } from "@mui/material";

const DeleteButton = ({ onClick, disabled }: ButtonBaseProps) => {
  return (
    <Button
      variant="contained"
      className="disabled:bg-gray-400 disabled:text-white"
      color="error"
      onClick={onClick}
      disabled={disabled}
    >
      삭제
    </Button>
  );
};

export default DeleteButton;
