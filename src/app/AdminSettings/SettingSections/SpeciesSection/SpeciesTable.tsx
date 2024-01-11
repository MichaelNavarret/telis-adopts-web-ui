import { useQuery } from "react-query";
import { getSpecies } from "../../../../api/species";
import TableComponent, {
  useDataTable,
} from "../../../../components/Table/TableComponent";
import { speciesTableColumns } from "../../../../constants/TablesColumns";
import strings from "../../../../l10n";

type SpeciesTableProps = {
  handleOpen: () => void;
};

const SpeciesTable = (props: SpeciesTableProps) => {
  const { handleOpen } = props;
  const { state } = useDataTable();

  const { data: speciesList } = useQuery({
    queryKey: ["species", state.currentPage],
    queryFn: () => {
      return getSpecies(state.currentPage);
    },
  });

  const totalPages = speciesList?.headers["x-pagination-total-pages"];

  return (
    <TableComponent
      title={strings.SPECIES}
      columns={speciesTableColumns}
      data={speciesList?.data || []}
      primaryButton={true}
      primaryButtonLabel={`${strings.ADD} ${strings.SPECIE}`}
      handlePrimaryButton={handleOpen}
      totalPages={totalPages}
      state={state}
    />
  );
};

export default SpeciesTable;
