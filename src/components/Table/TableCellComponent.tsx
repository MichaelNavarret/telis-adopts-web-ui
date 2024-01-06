import { TableCell } from "@mui/material";
import styles from "./TableComponent.module.scss";
import { useTheme } from "../../context/ThemeProvider";

type TableCellComponentProps = {
  content: string;
  columnHeader?: boolean;
};

const TableCellComponent = (props: TableCellComponentProps) => {
  const { content, columnHeader = false } = props;
  const { colors } = useTheme();
  return (
    <TableCell
      align="center"
      className={styles.tableCell}
      style={{
        backgroundColor: columnHeader ? colors.CTX_BUBBLE_COLOR : undefined,
        color: columnHeader ? colors.CTX_BUBBLE_ICON_COLOR : undefined,
        fontWeight: columnHeader ? "bold" : undefined,
        fontSize: columnHeader ? "1rem" : undefined,
      }}
    >
      {content}
    </TableCell>
  );
};

export default TableCellComponent;
