import { useQuery } from "react-query";
import { useTheme } from "../../../../context/ThemeProvider";
import { getTraits } from "../../../../api/traits";
import {
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./Tables.module.scss";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import TableCellComponent from "../../../../components/Table/TableCellComponent";

type TraitsTableProps = {
  handleOpen: () => void;
};

const TraitsTable = (props: TraitsTableProps) => {
  const { colors } = useTheme();
  const { handleOpen } = props;

  const { data: traitList, isLoading: isTraitListLoading } = useQuery({
    queryKey: ["traits"],
    queryFn: () => {
      return getTraits();
    },
  });

  const totalPages = traitList?.headers["x-pagination-total-pages"];

  const columns = [
    "Rarity",
    "Code",
    "Characteristics",
    "Specie",
    "Additional Info",
  ];

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
          <TableBody className={styles.tableContentBody}>
            {traitList &&
              traitList.data.map((trait) => {
                if (!isTraitListLoading) {
                  return (
                    <TableRow
                      key={trait.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCellComponent
                        key={trait.id + "_" + trait.rarity}
                        content={trait.rarity}
                      />
                      <TableCellComponent
                        key={trait.id + "_" + trait.code}
                        content={trait.code}
                      />
                      <TableCellComponent
                        key={trait.id + "_" + trait.characteristic}
                        content={trait.characteristic}
                      />
                      <TableCellComponent
                        key={trait.id + "_" + trait.specie}
                        content={trait.specie}
                        showEditIcon={true}
                      />
                      <TableCellComponent
                        key={trait.id + "_" + trait.specie}
                        content={trait.specie}
                        showEditIcon={true}
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

export default TraitsTable;
