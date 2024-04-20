import { TableRow } from "@mui/material";
import { useState } from "react";
import TableCellComponent from "./TableCellComponent";
import { useTheme } from "../../context/ThemeProvider";
import { ColumnsTable } from "./TableComponent";
import { hexToRGBA } from "../../tools/commons";

type TableRowComponentProps = {
  row: any;
  columns: ColumnsTable[];
  index: number;
};

const TableRowComponent = (props: TableRowComponentProps) => {
  const { row, columns, index } = props;
  const [hover, setHover] = useState(false);
  const { colors } = useTheme();
  const selectedColor = hexToRGBA(colors.selected_color, 0.1);

  return (
    <TableRow
      style={{
        backgroundColor: hover ? selectedColor : undefined,
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
            textColor={hover ? colors.text_color : undefined}
          />
        );
      })}
    </TableRow>
  );
};

export default TableRowComponent;
