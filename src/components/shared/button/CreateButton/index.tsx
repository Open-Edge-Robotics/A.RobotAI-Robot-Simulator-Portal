import { Button, ButtonProps } from "@mui/material";

const CreateButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      // className="border-emerald-500 bg-emerald-300 text-black-950 hover:bg-emerald-400"
      // className="border-navy-500 bg-navy-900 text-white hover:bg-navy-500"
      {...props}
    >
      생성
    </Button>
  );
};

export default CreateButton;
