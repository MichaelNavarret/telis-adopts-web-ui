import { useQuery } from "react-query";
import { getAdopts } from "../../../../api/adopts";
import TableComponent, {
  useDataTable,
} from "../../../../components/Table/TableComponent";
import { adoptsTableColumns } from "../../../../constants/TablesColumns";
import strings from "../../../../l10n";
import { formatAdoptsTableRows } from "./adoptsTableFormat";
import { adoptTableTabs } from "./components/adoptsTableTabs";

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
    queryKey: [
      "adopts",
      state.currentPage,
      state.currentTab,
      state.currentSearch,
    ],
    queryFn: () => {
      return getAdopts(
        {
          creationType: adoptTableTabs[state.currentTab].value,
          q: state.currentSearch,
        },
        state.currentPage
      );
    },
  });

  const totalPages = adoptsResponse?.headers["x-pagination-total-pages"];

  return (
    <TableComponent
      tabs={adoptTableTabs}
      title={strings.ADOPTS}
      columns={adoptsTableColumns}
      data={formatAdoptsTableRows(adoptsResponse?.data || [])}
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
