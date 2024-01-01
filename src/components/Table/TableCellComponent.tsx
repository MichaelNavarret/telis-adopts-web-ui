import { TableCell } from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import styles from "./Table.module.scss";
import { useTheme } from "../../context/ThemeProvider";

type TableCellComponentProps = {
  content: string;
};

const TableCellComponent = (props: TableCellComponentProps) => {
  const { content } = props;
  const { colors } = useTheme();
  return (
    <TableCell align="center" className={styles.tableCell}>
      {content}{" "}
      <ModeEditOutlineRoundedIcon
        className={styles.editIcon}
        style={{
          color: colors.CTX_BUBBLE_HOME_COLOR,
        }}
        fontSize="small"
      />
    </TableCell>
  );
};

export default TableCellComponent;
