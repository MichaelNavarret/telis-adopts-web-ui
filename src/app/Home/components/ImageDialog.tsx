import { Dialog } from "@mui/material";

type ImageDialogProps = {
  code: string;
  imageUrl: string;
  open: boolean;
  handleClose: () => void;
};

const ImageDialog = (props: ImageDialogProps) => {
  const { imageUrl, open, handleClose, code } = props;

  const getHeight = () => {
    if (code === "spectralumen") {
      return "auto";
    }
    return "800px";
  };

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
        height={getHeight()}
        style={{
          borderRadius: "20px",
        }}
      />
    </Dialog>
  );
};

export default ImageDialog;
