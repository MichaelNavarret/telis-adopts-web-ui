import { useQuery } from "react-query";
import { getTraits } from "../../../../api/traits";
import TableComponent from "../../../../components/Table/TableComponent";
import { traitsTableColumns } from "../../../../constants/TablesColumns";
import strings from "../../../../l10n";

type TraitsTableProps = {
  handleOpen: () => void;
};

const TraitsTable = (props: TraitsTableProps) => {
  const { handleOpen } = props;

  const { data: traitList } = useQuery({
    queryKey: ["traits"],
    queryFn: () => {
      return getTraits();
    },
  });

  const totalPages = traitList?.headers["x-pagination-total-pages"];

  return (
    <>
      <TableComponent
        title={strings.TRAITS}
        columns={traitsTableColumns}
        data={traitList?.data || []}
        primaryButton={true}
        primaryButtonLabel={`${strings.ADD} ${strings.TRAIT}`}
        handlePrimaryButton={handleOpen}
        totalPages={totalPages}
      />
    </>
  );
};

export default TraitsTable;
