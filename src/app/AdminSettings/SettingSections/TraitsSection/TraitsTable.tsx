import { useQuery } from "react-query";
import { getTraits } from "../../../../api/traits";
import TableComponent, {
  useDataTable,
} from "../../../../components/Table/TableComponent";
import { traitsTableColumns } from "../../../../constants/TablesColumns";
import strings from "../../../../l10n";
import { formatTraitTableRows } from "./traitsTableFormat";

type TraitsTableProps = {
  handleOpen: () => void;
};

const TraitsTable = (props: TraitsTableProps) => {
  const { handleOpen } = props;
  const { state } = useDataTable();

  const {
    data: traitList,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["traits"],
    queryFn: () => {
      return getTraits(state.currentPage);
    },
  });

  const totalPages = traitList?.headers["x-pagination-total-pages"];

  return (
    <>
      <TableComponent
        title={strings.TRAITS}
        columns={traitsTableColumns}
        data={formatTraitTableRows(traitList?.data || [])}
        primaryButton={true}
        primaryButtonLabel={`${strings.ADD} ${strings.TRAIT}`}
        handlePrimaryButton={handleOpen}
        totalPages={totalPages}
        state={state}
        loading={isLoading}
        fetching={isFetching}
      />
    </>
  );
};

export default TraitsTable;
