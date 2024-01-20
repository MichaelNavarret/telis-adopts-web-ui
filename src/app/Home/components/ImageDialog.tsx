import { Dialog } from "@mui/material";

type ImageDialogProps = {
  imageUrl: string;
  open: boolean;
  handleClose: () => void;
};

const ImageDialog = (props: ImageDialogProps) => {
  const { imageUrl, open, handleClose } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={"md"}
      PaperProps={{
        style: {
          borderRadius: "20px",
        },
      }}
    >
      <img
        src={imageUrl}
        alt="Image"
        height={800}
        style={{
          borderRadius: "20px",
        }}
      />
    </Dialog>
  );
};

export default ImageDialog;
