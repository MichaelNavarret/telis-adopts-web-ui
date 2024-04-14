import { useQuery } from "react-query";
import TableComponent, {
  useDataTable,
} from "../../../../components/Table/TableComponent";
import { getBadgesCollection } from "../../../../api/badges";
import strings from "../../../../l10n";
import { badgesTableColumns } from "../../../../constants/TablesColumns";
import { BadgeInfo } from "../../../../types/badge";
import { formatDate, isDefined } from "../../../../tools/commons";
import { useState } from "react";
import { BadgeUpdateBlade } from "./BadgeUpdateBlade";
import styles from "./BadgeTable.module.scss";
import { Chip } from "@mui/material";

type BadgesTableProps = {
  handleOpen: () => void;
};

const BadgesTable = (props: BadgesTableProps) => {
  const { handleOpen } = props;
  const { state } = useDataTable();
  const [showUpdateBlade, setShowUpdateBlade] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeInfo>();

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

  const formattedBadgesRow = (data?: BadgeInfo[]) => {
    return data?.map((badge) => {
      return {
        badgeUrl: getBadgeImage(badge),
        name: badge.name,
        code: badge.code,
        createdOn: formatBadgeCreatedOn(badge.createdOn),
        active: formatActiveStatus(badge.active),
      };
    });
  };

  const formatBadgeCreatedOn = (createdOn?: string) => {
    if (!isDefined(createdOn) || createdOn === "") return "-";
    return formatDate(createdOn);
  };

  const getBadgeImage = (badge: BadgeInfo) => {
    return (
      isDefined(badge) && (
        <img
          src={badge.badgeUrl}
          alt="badge_image"
          width={30}
          style={{ alignSelf: "center" }}
          onClick={() => handleClickBadge(badge)}
          className={styles.badgeIconRow}
        />
      )
    );
  };

  const formatActiveStatus = (status: boolean) => {
    return (
      <Chip
        style={{
          backgroundColor: status ? "#31CE8C" : "#E85667",
          color: "white",
        }}
        label={status ? strings.ACTIVE : strings.INACTIVE}
      />
    );
  };

  const handleClickBadge = (badge: BadgeInfo) => {
    setSelectedBadge(badge);
    setShowUpdateBlade(true);
  };

  return (
    <>
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
      <BadgeUpdateBlade
        open={showUpdateBlade}
        handleClose={() => setShowUpdateBlade(false)}
        badge={selectedBadge}
      />
    </>
  );
};

export default BadgesTable;
