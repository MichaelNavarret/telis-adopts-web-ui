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
import { useCallback, useState } from "react";
import CatsLoading from "../Loading/CatsLoading";
import { RxCrossCircled } from "react-icons/rx";
import { debounce } from "lodash";

export const useDataTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentSearch, setCurrentSearch] = useState("");

  return {
    state: {
      currentPage,
      setCurrentPage,
      currentTab,
      setCurrentTab,
      currentSearch,
      setCurrentSearch,
    },
  };
};

type HookDataTable = ReturnType<typeof useDataTable>["state"];

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
  state: HookDataTable;
  loading?: boolean;
  fetching?: boolean;
  height?: string;
  withPagination?: boolean;
  tabs?: any;
};

export const TableComponent = (props: TableComponentProps) => {
  const { colors } = useTheme();
  const [inputSearch, setInputSearch] = useState("");

  const {
    columns = [],
    data = [],
    stickyHeader = true,
    title,
    primaryButton = false,
    primaryButtonLabel = "",
    handlePrimaryButton,
    totalPages = 1,
    state,
    loading = false,
    fetching = false,
    height,
    withPagination = true,
    tabs,
  } = props;

  const NotFoundData = () => {
    return <div className={styles.notFoundData}>Data Not Found</div>;
  };

  const handlePagination = (pageNumber: number) => {
    state.setCurrentPage(pageNumber - 1);
  };

  const displayNoContent = () => {
    if (loading) {
      return (
        <div className={styles.notFoundData}>
          <CatsLoading colorDots={colors.primary_color} withDots />
        </div>
      );
    }
    if (!loading && data.length === 0) return <NotFoundData />;
  };

  const debounceSetCurrentSearch = useCallback(
    debounce((value) => {
      state.setCurrentSearch(value);
      state.setCurrentPage(0);
    }, 1000),
    []
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          {title && <h1 style={{ color: colors.text_03_color }}>{title}</h1>}
          {fetching && (
            <CatsLoading withDots colorDots={colors.primary_color} />
          )}
        </div>
        <div className={styles.buttonsContainer}>
          {primaryButton && (
            <Button
              className={styles.primaryButton}
              height="auto"
              width="auto"
              onClick={handlePrimaryButton}
              buttonColorShadow={colors.shadow_color}
            >
              {primaryButtonLabel}
            </Button>
          )}
        </div>
      </div>

      {tabs && (
        <div className={styles.tabsContainer}>
          {tabs.map((tab: any, index: number) => (
            <Button
              className={styles.tabButton}
              content={tab.label}
              key={index}
              height="30px"
              width="180px"
              fontSize="x-small"
              withShadow={false}
              singleSelected={state.currentTab === index}
              onClick={() => state.setCurrentTab(index)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      )}

      <div className={styles.searchContainer}>
        <input
          type="text"
          value={inputSearch}
          placeholder="Search..."
          className={styles.searchInput}
          onChange={(e) => {
            setInputSearch(e.target.value);
            debounceSetCurrentSearch(e.target.value);
          }}
        />

        <RxCrossCircled
          onClick={() => {
            setInputSearch("");
            state.setCurrentSearch("");
          }}
          size={25}
          className={styles.clearSearch}
        />
      </div>

      <TableContainer
        className={styles.tableContainer}
        style={{
          height: height ? height : "700px",
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
        {displayNoContent()}
      </TableContainer>
      {withPagination && (
        <Pagination
          className={styles.pagination}
          page={state.currentPage + 1}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "black",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: colors.primary_color,
            },
          }}
          count={Number(totalPages)}
          onChange={(_e, value) => handlePagination(value)}
          variant="outlined"
        />
      )}
    </div>
  );
};

export default TableComponent;
