import TextComponent from "../../../../components/TextComponents/TextComponent";
import { useTheme } from "../../../../context/ThemeProvider";
import styles from "./components.module.scss";
import { FaEdit } from "react-icons/fa";

type ImageSectionProps = {
  titleSection: string;
  imageUrl: string;
  onEdit: () => void;
  padding?: string;
  roundedImage?: string;
};

const ImageSection = (props: ImageSectionProps) => {
  const { titleSection, imageUrl, onEdit, padding, roundedImage } = props;
  const { colors } = useTheme();

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
      <FaEdit
        className={styles.editImageIcon}
        onClick={onEdit}
        style={{
          color: colors.CTX_BUTTON_COLOR,
        }}
      />
    </div>
  );
};

export default ImageSection;
