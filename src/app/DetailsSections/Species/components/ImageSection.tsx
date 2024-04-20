import { useCallback } from "react";
import TextComponent from "../../../../components/TextComponents/TextComponent";
import { useTheme } from "../../../../context/ThemeProvider";
import styles from "./components.module.scss";
import { FaEdit } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

type ImageSectionProps = {
  titleSection: string;
  imageUrl?: string;
  onEdit: (files: File[]) => void;
  padding?: string;
  roundedImage?: string;
  width?: string;
  paddingBottom?: string;
};

const ImageSection = (props: ImageSectionProps) => {
  const {
    titleSection,
    imageUrl,
    onEdit,
    padding,
    roundedImage,
    width = "100%",
    paddingBottom,
  } = props;
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
      style={{ border: `1px solid ${colors.primary_color}`, padding }}
    >
      <TextComponent
        content={titleSection}
        animation={false}
        hover={false}
        fontSize="large"
        className={styles.titleImage}
        colorText={colors.text_03_color}
      />
      <img
        src={imageUrl}
        alt="Logo"
        width={width}
        style={{ borderRadius: roundedImage, paddingBottom }}
      />

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <FaEdit
          className={styles.editImageIcon}
          style={{
            color: colors.primary_color,
          }}
        />
      </div>
    </div>
  );
};

export default ImageSection;
