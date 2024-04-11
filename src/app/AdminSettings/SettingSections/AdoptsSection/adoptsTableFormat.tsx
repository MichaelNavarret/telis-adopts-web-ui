import { AdoptInfo } from "../../../../types/adopt";
import { FaEye } from "react-icons/fa";
import styles from "./adoptsTableFormat.module.scss";
import { Chip, Tooltip } from "@mui/material";
import NOT_ICON from "../../../../assets/utils/not_icon.png";
import { isDefined } from "../../../../tools/commons";
import { Link } from "react-router-dom";
import { BadgeInfo } from "../../../../types/badge";
import { OwnerInfo } from "../../../../types/owner";
import strings from "../../../../l10n";

export function formatAdoptsTableRows(data: AdoptInfo[]) {
  return data.map((item) => {
    return {
      code: formatCode(item.id, item.code),
      name: item.name,
      ownerName: item.ownerName,
      badge: formatBadge(item.badge),
      specieName: item.specieName,
      rarity: item.rarity,
      designers: formatDesigners(item.designers),
      preview: formatPreviewRow(getIcon(item.iconUrl)),
      active: formatActiveStatus(item.active),
    };
  });
}

const formatActiveStatus = (status: boolean) => {
  return <Chip label={status ? strings.ACTIVE : strings.INACTIVE} />;
};

const formatDesigners = (designers: OwnerInfo[]) => {
  if (isDefined(designers) && designers.length > 0) {
    return designers.map((designer) => designer.nickName).join(", ");
  }
};

const formatBadge = (badge: BadgeInfo) => {
  return (
    isDefined(badge) && (
      <img
        src={badge.badgeUrl}
        alt="Logo"
        width={30}
        style={{ alignSelf: "center" }}
      />
    )
  );
};

const formatCode = (adoptId: string, code: string) => {
  return (
    <Link
      className={styles.linkRow}
      to={`/detailsSections/adoptDetails/${adoptId}`}
    >
      {code}
    </Link>
  );
};

function formatPreviewRow(iconUrl: string) {
  return (
    <Tooltip
      title={<img src={iconUrl} width={"150px"} />}
      arrow
      datatype="div"
      placement="right"
      componentsProps={{
        tooltip: { sx: { borderRadius: "150%" } },
      }}
    >
      <div>
        <FaEye className={styles.eyeIcon} />
      </div>
    </Tooltip>
  );
}

function getIcon(iconUrl: string) {
  if (isDefined(iconUrl)) return iconUrl;
  return NOT_ICON;
}
