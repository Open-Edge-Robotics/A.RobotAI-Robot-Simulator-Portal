import FlexCol from "@/components/common/FlexCol";
import PageTitle from "@/components/common/PageTitle";
import { Button, Dialog } from "@mui/material";
import { TbAlertTriangle } from "react-icons/tb";

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onAccept?: () => void;
};

const AlertModal = ({ isOpen, title, message, onClose, onAccept }: Props) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
        },
      }}
    >
      <FlexCol className="items-center justify-center gap-8 p-4">
        <FlexCol className="items-center justify-center gap-2">
          <TbAlertTriangle size={40} color="#D32F2F" />
          <PageTitle>{title}</PageTitle>
          <p className="text-md">{message}</p>
        </FlexCol>
        <div className="flex gap-2">
          <Button variant="contained" color="info" onClick={onClose}>
            취소
          </Button>
          <Button variant="contained" color="error" onClick={onAccept}>
            확인
          </Button>
        </div>
      </FlexCol>
    </Dialog>
  );
};

export default AlertModal;
