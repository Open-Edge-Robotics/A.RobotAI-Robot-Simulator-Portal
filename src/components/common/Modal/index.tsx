import { Dialog } from "@mui/material";

type ModalProps = {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ open = true, children, onClose }: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
        },
      }}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
