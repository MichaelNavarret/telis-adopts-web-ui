import { useQuery } from "react-query";
import { useTheme } from "../../../../context/ThemeProvider";
import { getSpecies } from "../../../../api/species";
import {
  CircularProgress,
  Pagination,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import TableCellComponent from "../../../../components/Table/TableCellComponent";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import styles from "./Tables.module.scss";

type SpeciesTableProps = {
  handleOpen: () => void;
};

const SpeciesTable = (props: SpeciesTableProps) => {
  const { colors } = useTheme();
  const { handleOpen } = props;
  const { data: speciesList, isLoading: isSpeciesListLoading } = useQuery({
    queryKey: ["species"],
    queryFn: () => {
      return getSpecies();
    },
  });

  const totalPages = speciesList?.headers["x-pagination-total-pages"];

  const columns = ["Species"];

  return (
    <>
      <TableContainer className={styles.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => {
                return (
                  <TableCell
                    key={column + "_" + index}
                    align="center"
                    style={{
                      backgroundColor: colors.CTX_BUBBLE_COLOR,
                      color: colors.CTX_BUBBLE_ICON_COLOR,
                    }}
                  >
                    {column}
                    <AddCircleRoundedIcon
                      className={styles.addButtonTable}
                      fontSize="large"
                      style={{
                        color: colors.CTX_BUBBLE_HOME_COLOR,
                      }}
                      onClick={handleOpen}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableContentBody}>
            {speciesList &&
              speciesList.data.map((specie) => {
                if (!isSpeciesListLoading) {
                  return (
                    <TableRow
                      key={specie.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCellComponent
                        key={specie.id + "_" + specie.name}
                        content={specie.name}
                      />
                    </TableRow>
                  );
                }
                return <CircularProgress />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Number(totalPages) || 0}
        variant="outlined"
        color="secondary"
      />
    </>
  );
};

export default SpeciesTable;
