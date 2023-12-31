import { TableRow } from "@mui/material";
import { useState } from "react";
import TableCellComponent from "./TableCellComponent";
import { useTheme } from "../../context/ThemeProvider";
import { ColumnsTable } from "./TableComponent";

type TableRowComponentProps = {
  row: any;
  columns: ColumnsTable[];
  index: number;
};

const TableRowComponent = (props: TableRowComponentProps) => {
  const { row, columns, index } = props;
  const [hover, setHover] = useState(false);
  const { colors } = useTheme();

  return (
    <TableRow
      style={{
        backgroundColor: hover ? colors.CTX_TABLE_ROW_HOVER_COLOR : undefined,
      }}
      key={`${row}_${index}`}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {columns.map((column, index) => {
        return (
          <TableCellComponent
            key={`${column.value}_${index}`}
            content={row[column.value]}
            textColor={
              hover ? colors.CTX_TABLE_ROW_HOVER_TEXT_COLOR : undefined
            }
          />
        );
      })}
    </TableRow>
  );
};

export default TableRowComponent;
