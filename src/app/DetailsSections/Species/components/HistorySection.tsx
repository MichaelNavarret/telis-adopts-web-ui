import { Container } from "@mui/system";
import styles from "./components.module.scss";
import { useTheme } from "../../../../context/ThemeProvider";
import { FaEdit } from "react-icons/fa";
import TextComponent from "../../../../components/TextComponents/TextComponent";

type HistorySectionProps = {
  history: string;
  onEdit?: () => void;
};

const HistorySection = (props: HistorySectionProps) => {
  const { history, onEdit } = props;
  const { colors } = useTheme();

  return (
    <Container
      className={styles.historySection}
      style={{
        border: `1px solid ${colors.primary_color}`,
      }}
      sx={{
        //-webkit-scrollbar
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-track": {
          background: colors.secondary_color,
        },
        "&::-webkit-scrollbar-thumb": {
          background: colors.primary_color,
        },
      }}
    >
      <div className={styles.historyTitleContainer}>
        <TextComponent
          content={"History"}
          animation={false}
          hover={false}
          fontSize="large"
          className={styles.titleLogo}
          colorText={colors.text_03_color}
        />
      </div>
      <pre className={styles.history}>{history}</pre>
      <FaEdit
        className={styles.editHistoryIcon}
        onClick={onEdit}
        style={{
          color: colors.primary_color,
        }}
      />
    </Container>
  );
};

export default HistorySection;
