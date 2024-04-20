import TextComponent from "../../../../components/TextComponents/TextComponent";
import { useTheme } from "../../../../context/ThemeProvider";
import styles from "./components.module.scss";
import { Button } from "../../../../components";
import strings from "../../../../l10n";
import { isDefined } from "../../../../tools/commons";

type ImageSectionProps = {
  titleSection: string;
  imageUrl?: string;
  onEdit?: () => void;
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

  return (
    <div
      className={styles.imageContainer}
      style={{ border: `1px solid ${colors.primary_color}`, padding }}
    >
      <div className={styles.titleContainer}>
        <TextComponent
          content={titleSection}
          animation={false}
          hover={false}
          fontSize="large"
          colorText={colors.text_03_color}
        />
        {onEdit && (
          <Button
            content={strings.EDIT}
            width="90px"
            height="20px"
            fontSize="x-small"
            onClick={onEdit}
            withShadow={false}
          />
        )}
      </div>
      {isDefined(imageUrl) && imageUrl != "" ? (
        <img
          src={imageUrl}
          alt="Logo"
          width={width}
          style={{
            borderRadius: roundedImage,
            paddingBottom,
            alignSelf: "center",
          }}
        />
      ) : (
        <div style={{ alignSelf: "center" }}>-</div>
      )}
    </div>
  );
};

export default ImageSection;
