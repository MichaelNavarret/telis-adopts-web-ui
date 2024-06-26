import { Chip } from "@mui/material";
import { OwnerInfo } from "../../../../types/owner";
import strings from "../../../../l10n";

export function formatOwnersTableRows(data: OwnerInfo[]) {
  return data.map((item) => {
    return {
      nickName: item.nickName,
      email: item.email,
      status: formatStatus(item.status),
    };
  });
}

const formatStatus = (status: boolean) => {
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
