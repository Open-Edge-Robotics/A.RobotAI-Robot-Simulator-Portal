import { Button, ButtonProps } from "@mui/material";

type CreateButtonProps = {} & ButtonProps;

const CreateButton = ({ ...props }: CreateButtonProps) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      생성
    </Button>
  );
};

export default CreateButton;
