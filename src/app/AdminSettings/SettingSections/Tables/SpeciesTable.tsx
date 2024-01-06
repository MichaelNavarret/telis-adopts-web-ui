import { useQuery } from "react-query";
import { getSpecies } from "../../../../api/species";
import TableComponent from "../../../../components/Table/TableComponent";
import { speciesTableColumns } from "../../../../constants/TablesColumns";

type SpeciesTableProps = {
  handleOpen: () => void;
};

const SpeciesTable = (props: SpeciesTableProps) => {
  const { handleOpen } = props;
  const { data: speciesList } = useQuery({
    queryKey: ["species"],
    queryFn: () => {
      return getSpecies();
    },
  });

  const totalPages = speciesList?.headers["x-pagination-total-pages"];

  return (
    <TableComponent
      title="Species"
      columns={speciesTableColumns}
      data={speciesList?.data || []}
      primaryButton={true}
      primaryButtonLabel="Add Species"
      handlePrimaryButton={handleOpen}
      totalPages={totalPages}
    />
  );
};

export default SpeciesTable;
