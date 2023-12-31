import { useQuery } from "react-query";
import { getAdopts } from "../../../../api/adopts";
import TableComponent from "../../../../components/Table/TableComponent";
import { adoptsTableColumns } from "../../../../constants/TablesColumns";
import strings from "../../../../l10n";

type AdoptsTableProps = {
  handleOpen: () => void;
};

const AdoptsTable = (props: AdoptsTableProps) => {
  const { handleOpen } = props;

  const { data: adoptsResponse } = useQuery({
    queryKey: ["adopts"],
    queryFn: () => {
      return getAdopts();
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
    />
  );
};

export default AdoptsTable;
