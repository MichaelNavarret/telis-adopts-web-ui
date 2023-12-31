import {
  Pagination,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCellComponent from "./TableCellComponent";
import styles from "./TableComponent.module.scss";
import { Button } from "..";
import { useTheme } from "../../context/ThemeProvider";
import TableRowComponent from "./TableRowComponent";

export type ColumnsTable = {
  value: string;
  label: string;
};

type TableComponentProps = {
  columns: ColumnsTable[];
  data: any[];
  stickyHeader?: boolean;
  title?: string;
  primaryButton?: boolean;
  primaryButtonLabel?: string;
  handlePrimaryButton?: () => void;
  totalPages?: number;
};

export const TableComponent = (props: TableComponentProps) => {
  const { colors } = useTheme();

  const {
    columns = [],
    data = [],
    stickyHeader = true,
    title,
    primaryButton = false,
    primaryButtonLabel = "",
    handlePrimaryButton,
    totalPages = 1,
  } = props;

  const NotFoundData = () => {
    return <div className={styles.notFoundData}>Data Not Found</div>;
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        {title && (
          <h1 style={{ color: colors.CTX_TABLE_TITLE_COLOR }}>{title}</h1>
        )}
        <div className={styles.buttonsContainer}>
          {primaryButton && (
            <Button
              className={styles.primaryButton}
              height="auto"
              width="auto"
              onClick={handlePrimaryButton}
              buttonColorShadow={colors.CTX_BUTTON_SHADOW_COLOR_2}
            >
              {primaryButtonLabel}
            </Button>
          )}
        </div>
      </div>
      <TableContainer className={styles.tableContainer}>
        <Table stickyHeader={stickyHeader}>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => {
                return (
                  <TableCellComponent
                    key={`${column.value}_${index}`}
                    content={column.label}
                    columnHeader={true}
                  />
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => {
              return (
                <TableRowComponent
                  key={`${row}_${index}`}
                  row={row}
                  columns={columns}
                  index={index}
                />
              );
            })}
          </TableBody>
        </Table>
        {data.length === 0 && <NotFoundData />}
      </TableContainer>
      <Pagination
        className={styles.pagination}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "black",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: colors.CTX_BUTTON_COLOR,
          },
        }}
        count={Number(totalPages)}
        variant="outlined"
      />
    </div>
  );
};

export default TableComponent;
