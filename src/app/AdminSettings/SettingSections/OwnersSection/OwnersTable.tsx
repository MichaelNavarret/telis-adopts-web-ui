import { useQuery } from "react-query";
import TableComponent, {
  useDataTable,
} from "../../../../components/Table/TableComponent";
import { getOwnersCollection } from "../../../../api/owners";
import strings from "../../../../l10n";
import { ownersTableColumns } from "../../../../constants/TablesColumns";
import { formatOwnersTableRows } from "./ownersTableFormat";

type OwnersTableProps = {};

const OwnersTable = (props: OwnersTableProps) => {
  const {} = props;
  const { state } = useDataTable();

  const {
    data: ownerList,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["owners", state.currentPage],
    queryFn: () => {
      return getOwnersCollection(state.currentPage);
    },
  });

  const totalPages = ownerList?.headers["x-pagination-total-pages"];

  return (
    <TableComponent
      title={strings.OWNERS}
      columns={ownersTableColumns}
      data={formatOwnersTableRows(ownerList?.data || [])}
      primaryButton={true}
      primaryButtonLabel={`${strings.ADD} ${strings.OWNER}`}
      handlePrimaryButton={() => {}}
      totalPages={totalPages}
      state={state}
      loading={isLoading}
      fetching={isFetching}
    />
  );
};

export default OwnersTable;
