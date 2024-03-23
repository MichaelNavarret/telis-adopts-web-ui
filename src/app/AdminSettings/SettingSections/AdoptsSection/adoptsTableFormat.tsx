import { AdoptInfo } from "../../../../types/adopt";
import { FaEye } from "react-icons/fa";
import styles from "./adoptsTableFormat.module.scss";
import { Tooltip } from "@mui/material";
import NOT_ICON from "../../../../assets/utils/not_icon.png";
import { isDefined } from "../../../../tools/commons";

export function formatAdoptsTableRows(data: AdoptInfo[]) {
  return data.map((item) => {
    return {
      code: item.code,
      name: item.name,
      ownerName: item.ownerName,
      specieName: item.specieName,
      rarity: item.rarity,
      designers: item.designers,
      preview: formatPreviewRow(getIcon(item.iconUrl)),
    };
  });
}

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
