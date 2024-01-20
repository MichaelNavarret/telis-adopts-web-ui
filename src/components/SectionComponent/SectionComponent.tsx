import { Button } from "..";
import { useTheme } from "../../context/ThemeProvider";
import strings from "../../l10n";
import TextComponent from "../TextComponents/TextComponent";
import styles from "./SectionComponent.module.scss";

type SectionComponentProps = {
  titleSection: string;
  onEdit?: () => void;
  children: React.ReactNode;
};

const SectionComponent = (props: SectionComponentProps) => {
  const { titleSection, onEdit, children } = props;
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
          />
        )}
      </div>
      <div className={styles.sectionContent}>{children}</div>
    </div>
  );
};

export default SectionComponent;
