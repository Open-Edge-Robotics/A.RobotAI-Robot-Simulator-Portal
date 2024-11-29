import { Typography } from "@mui/material";

type Props = {
  message?: string;
};

const NonContent = ({ message = "데이터가 없습니다" }: Props) => {
  return (
    <div className="flex h-80 w-full justify-center rounded-[4px] bg-white bg-opacity-50 p-2">
      <div className="self-center">
        <Typography variant="h6" className="text-sm font-normal text-gray-900">
          {message}
        </Typography>
      </div>
    </div>
  );
};

export default NonContent;
