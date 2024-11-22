import { Button, ButtonProps } from "@mui/material";

const CreateButton = ({ ...props }: ButtonProps) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      생성
    </Button>
  );
};

export default CreateButton;
