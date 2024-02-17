import { useQuery } from "react-query";
import { getAdopts } from "../../../../api/adopts";
import TableComponent, {
  useDataTable,
} from "../../../../components/Table/TableComponent";
import { adoptsTableColumns } from "../../../../constants/TablesColumns";
import strings from "../../../../l10n";

type AdoptsTableProps = {
  handleOpen: () => void;
};

const AdoptsTable = (props: AdoptsTableProps) => {
  const { handleOpen } = props;
  const { state } = useDataTable();

  const {
    data: adoptsResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["adopts", state.currentPage],
    queryFn: () => {
      return getAdopts({}, state.currentPage);
    },
  });

  const totalPages = adoptsResponse?.headers["x-pagination-total-pages"];

  return (
    <TableComponent
      title={strings.ADOPT}
      columns={adoptsTableColumns}
      data={adoptsResponse?.data || []}
      primaryButton={true}
      primaryButtonLabel={`${strings.ADD} ${strings.ADOPT}`}
      handlePrimaryButton={handleOpen}
      totalPages={totalPages}
      state={state}
      loading={isLoading}
      fetching={isFetching}
    />
  );
};

export default AdoptsTable;
