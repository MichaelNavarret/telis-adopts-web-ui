import { TableCell } from "@mui/material";
import styles from "./TableComponent.module.scss";
import { useTheme } from "../../context/ThemeProvider";

type TableCellComponentProps = {
  content: string;
  columnHeader?: boolean;
  textColor?: string;
};

const TableCellComponent = (props: TableCellComponentProps) => {
  const { content, columnHeader = false, textColor } = props;
  const { colors } = useTheme();
  return (
    <TableCell
      align="center"
      className={styles.tableCell}
      style={{
        backgroundColor: columnHeader ? colors.selected_color : undefined,
        color: columnHeader ? colors.text_02_color : textColor,
        fontWeight: columnHeader ? "bold" : undefined,
        fontSize: columnHeader ? "1rem" : undefined,
      }}
    >
      {content}
    </TableCell>
  );
};

export default TableCellComponent;
