import FlexCol from "@/components/common/FlexCol";
import PageTitle from "@/components/common/PageTitle";
import { Button, Dialog } from "@mui/material";

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
      <FlexCol className="items-center justify-center gap-4 p-4">
        <FlexCol className="items-center justify-center gap-2">
          <PageTitle>{title}</PageTitle>
          <p className="text-sm">{message}</p>
        </FlexCol>
        <div className="flex gap-2">
          <Button variant="contained" color="info">
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
