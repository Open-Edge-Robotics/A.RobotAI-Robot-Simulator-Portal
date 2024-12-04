import {
  CircularProgress,
  CircularProgressProps,
  Dialog,
  Typography,
} from "@mui/material";

type Props = {
  isOpen: boolean;
  message: string;
} & CircularProgressProps;

const LoadingBar = ({ isOpen, message }: Props) => {
  return (
    <Dialog open={isOpen}>
      <div className="flex w-fit flex-col items-center justify-center gap-4 bg-white p-8">
        <CircularProgress color="info" />
        <Typography variant="h6" className="text-nowrap text-sm text-gray-950">
          {message}
        </Typography>
      </div>
    </Dialog>
  );
};

export default LoadingBar;
