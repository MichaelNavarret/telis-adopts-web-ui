import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCellComponent from "../../../../components/Table/TableCellComponent";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useTheme } from "../../../../context/ThemeProvider";
import styles from "./Tables.module.scss";

type AdoptsTableProps = {
  handleOpen: () => void;
};

const AdoptsTable = (props: AdoptsTableProps) => {
  const { colors } = useTheme();
  const { handleOpen } = props;

  const columns = ["Code", "Name", "Owner", "Specie", "Rarity"];

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
                    {index == columns.length - 1 && (
                      <AddCircleRoundedIcon
                        className={styles.addButtonTable}
                        fontSize="large"
                        style={{
                          color: colors.CTX_BUBBLE_HOME_COLOR,
                        }}
                        onClick={handleOpen}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          {/* <TableBody className={styles.tableContentBody}>
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
          </TableBody> */}
        </Table>
      </TableContainer>
      <Pagination count={0} variant="outlined" color="secondary" />
    </>
  );
};

export default AdoptsTable;
