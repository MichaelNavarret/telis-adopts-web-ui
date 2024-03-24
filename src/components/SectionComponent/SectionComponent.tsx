import { Button } from "..";
import { useTheme } from "../../context/ThemeProvider";
import strings from "../../l10n";
import TextComponent from "../TextComponents/TextComponent";
import styles from "./SectionComponent.module.scss";

type SectionComponentProps = {
  titleSection: string;
  onEdit?: () => void;
  children: React.ReactNode;
  flexDirection?: "row" | "column";
  alignItems?: "center" | "flex-start" | "flex-end";
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between";
};

const SectionComponent = (props: SectionComponentProps) => {
  const {
    titleSection,
    onEdit,
    children,
    flexDirection = "row",
    alignItems = "center",
    justifyContent = "flex-start",
  } = props;
  const { colors } = useTheme();
  const borderStyle = "1px solid " + colors.CTX_MENUBAR_COLOR;
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
          colorText={colors.CTX_FORM_TITLE_COLOR}
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
      <div
        className={styles.sectionContent}
        style={{ flexDirection, alignItems, justifyContent }}
      >
        {children}
      </div>
    </div>
  );
};

export default SectionComponent;
