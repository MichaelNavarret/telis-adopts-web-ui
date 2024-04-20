import { Button } from "..";
import { useTheme } from "../../context/ThemeProvider";
import strings from "../../l10n";
import TextComponent from "../TextComponents/TextComponent";
import styles from "./SectionComponent.module.scss";

type SectionComponentProps = {
  titleSection: string;
  onEdit?: () => void;
  children: React.ReactNode;
  displayType?: "column" | "row";
};

const SectionComponent = (props: SectionComponentProps) => {
  const { titleSection, onEdit, children, displayType = "column" } = props;
  const { colors } = useTheme();
  const borderStyle = "1px solid " + colors.primary_color;

  //This will use to get the styles of the section base on if is column or row.
  const getSectionStyles = () => {
    if (displayType === "column") return styles.gridSectionContent;
    return styles.flexSectionContent;
  };

  return (
    <div
      className={styles.sectionComponentContainer}
      style={{ border: borderStyle }}
    >
      <div
        className={styles.sectionHeader}
        style={{ borderBottom: borderStyle }}
      >
        <TextComponent
          content={titleSection}
          animation={false}
          hover={false}
          fontSize="medium"
          colorText={colors.secondary_color}
        />
        {onEdit && (
          <Button
            content={strings.EDIT}
            width="100px"
            height="30px"
            fontSize="small"
            onClick={onEdit}
            withShadow={false}
          />
        )}
      </div>
      <div className={getSectionStyles()}>{children}</div>
    </div>
  );
};

export default SectionComponent;
