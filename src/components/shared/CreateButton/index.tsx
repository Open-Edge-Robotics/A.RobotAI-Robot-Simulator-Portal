import { Button } from "@mui/material";

type CreateButtonProps = {
  onClick: () => void;
};

const CreateButton = ({ onClick }: CreateButtonProps) => {
  return (
    <Button variant="contained" onClick={onClick} color="primary">
      생성
    </Button>
  );
};

export default CreateButton;
