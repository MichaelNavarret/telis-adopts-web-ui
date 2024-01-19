import TextComponent from "../../../../components/TextComponents/TextComponent";
import { useTheme } from "../../../../context/ThemeProvider";
import styles from "./components.module.scss";
import { FaEdit } from "react-icons/fa";

type ImageSectionProps = {
  titleSection: string;
  imageUrl: string;
  onEdit: () => void;
};

const ImageSection = (props: ImageSectionProps) => {
  const { titleSection, imageUrl, onEdit } = props;
  const { colors } = useTheme();

  return (
    <div
      className={styles.logoContainer}
      style={{ border: `1px solid ${colors.CTX_BUTTON_COLOR}` }}
    >
      <TextComponent
        content={titleSection}
        animation={false}
        hover={false}
        fontSize="large"
        className={styles.titleLogo}
        colorText={colors.CTX_FORM_TITLE_COLOR}
      />
      <img src={imageUrl} alt="Logo" width={"100%"} />
      <FaEdit
        className={styles.editLogoIcon}
        onClick={onEdit}
        style={{
          color: colors.CTX_BUTTON_COLOR,
        }}
      />
    </div>
  );
};

export default ImageSection;
