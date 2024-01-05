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
import { useQuery } from "react-query";
import { getAdopts } from "../../../../api/adopts";
import { isDefined } from "../../../../tools/commons";

type AdoptsTableProps = {
  handleOpen: () => void;
};

const AdoptsTable = (props: AdoptsTableProps) => {
  const { colors } = useTheme();
  const { handleOpen } = props;
  const columns = ["Code", "Name", "Owner", "Specie", "Rarity"];

  const { data: adoptsResponse } = useQuery({
    queryKey: ["adopts"],
    queryFn: () => {
      return getAdopts();
    },
  });

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
            {adoptsResponse &&
              adoptsResponse.data.map((adopt) => {
                return (
                  <TableRow
                    key={adopt.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCellComponent
                      key={adopt.id + "_" + adopt.code}
                      content={adopt.code}
                    />
                    <TableCellComponent
                      key={adopt.id + "_" + adopt.name}
                      content={adopt.name}
                    />
                    <TableCellComponent
                      key={adopt.id + "_" + adopt.ownerName}
                      content={
                        isDefined(adopt.ownerName)
                          ? adopt.ownerName
                          : "NOT_REGISTERED_YET"
                      }
                    />
                    <TableCellComponent
                      key={adopt.id + "_" + adopt.specieName}
                      content={adopt.specieName}
                    />
                    <TableCellComponent
                      key={adopt.id + "_" + adopt.rarity}
                      content={adopt.rarity}
                    />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={0} variant="outlined" color="secondary" />
    </>
  );
};

export default AdoptsTable;
