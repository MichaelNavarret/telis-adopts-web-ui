import { useCallback } from "react";
import TextComponent from "../../../../components/TextComponents/TextComponent";
import { useTheme } from "../../../../context/ThemeProvider";
import styles from "./components.module.scss";
import { FaEdit } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

type ImageSectionProps = {
  titleSection: string;
  imageUrl: string;
  onEdit: (files: File[]) => void;
  padding?: string;
  roundedImage?: string;
};

const ImageSection = (props: ImageSectionProps) => {
  const { titleSection, imageUrl, onEdit, padding, roundedImage } = props;
  const { colors } = useTheme();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onEdit(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div
      className={styles.imageContainer}
      style={{ border: `1px solid ${colors.CTX_BUTTON_COLOR}`, padding }}
    >
      <TextComponent
        content={titleSection}
        animation={false}
        hover={false}
        fontSize="large"
        className={styles.titleImage}
        colorText={colors.CTX_FORM_TITLE_COLOR}
      />
      <img
        src={imageUrl}
        alt="Logo"
        width={"100%"}
        style={{ borderRadius: roundedImage }}
      />

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <FaEdit
          className={styles.editImageIcon}
          style={{
            color: colors.CTX_BUTTON_COLOR,
          }}
        />
      </div>
    </div>
  );
};

export default ImageSection;
