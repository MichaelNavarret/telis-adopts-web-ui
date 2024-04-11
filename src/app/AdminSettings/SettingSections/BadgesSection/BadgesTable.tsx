import { useQuery } from "react-query";
import TableComponent, {
  useDataTable,
} from "../../../../components/Table/TableComponent";
import { getBadgesCollection } from "../../../../api/badges";
import strings from "../../../../l10n";
import { badgesTableColumns } from "../../../../constants/TablesColumns";
import { BadgeInfo } from "../../../../types/badge";
import { formattedBadgesRow } from "./BadgesTableFormat";

type BadgesTableProps = {
  handleOpen: () => void;
};

const BadgesTable = (props: BadgesTableProps) => {
  const { handleOpen } = props;
  const { state } = useDataTable();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "badges",
      "collection",
      state.currentPage,
      state.currentTab,
      state.currentSearch,
    ],
    queryFn: () => {
      return getBadgesCollection(
        {
          q: state.currentSearch,
        },
        state.currentPage
      );
    },
  });

  const totalPages = data?.headers["x-pagination-total-pages"];

  return (
    <TableComponent
      title={strings.BADGES}
      columns={badgesTableColumns}
      data={formattedBadgesRow(data?.data) || []}
      primaryButton={true}
      primaryButtonLabel={`${strings.ADD} ${strings.BADGE}`}
      handlePrimaryButton={handleOpen}
      totalPages={totalPages}
      state={state}
      loading={isLoading}
      fetching={isFetching}
    />
  );
};

export default BadgesTable;
