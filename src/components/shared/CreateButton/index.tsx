import { Button } from "@mui/material";

type CreateButtonProps = {
  onClick: () => void;
};

const CreateButton = ({ onClick }: CreateButtonProps) => {
  return (
    <Button
      variant="outlined"
      className="border-emerald-600 bg-emerald-200 text-sm text-black-950"
      onClick={onClick}
    >
      생성
    </Button>
  );
};

export default CreateButton;
