import { useMutation, useQuery, useQueryClient } from "react-query";
import { OwnerSingletonResponse } from "../../../../../types/owner";
import { getIconsByOwnerId } from "../../../../../api/icons";
import styles from "./IconSection.module.scss";
import { useTheme } from "../../../../../context/ThemeProvider";
import { updateOwner } from "../../../../../api/owners";
import { successToast } from "../../../../../constants/toasts";
import strings from "../../../../../l10n";
import { CircularProgress } from "@mui/material";
import { IconItem } from "./IconItem";

type IconSectionProps = {
  owner?: OwnerSingletonResponse;
};

export const IconSection = (props: IconSectionProps) => {
  const { owner } = props;
  const { colors } = useTheme();
  const queryClient = useQueryClient();

  const { data: iconCollectionResponse } = useQuery({
    queryKey: ["icons", owner?.ownerSingletonInfo.id],
    queryFn: () => getIconsByOwnerId(owner?.ownerSingletonInfo.id || ""),
    enabled: !!owner,
  });

  const {
    mutate: updateProfileIconMutation,
    isLoading: isUpdateProfileIconLoading,
  } = useMutation({
    mutationFn: (iconId: string) => {
      return updateOwner(owner?.ownerSingletonInfo.id || "", {
        iconId: iconId,
      });
    },
    onSuccess: () => {
      successToast(strings.OWNER_UPDATE_ICON_PROFILE_SUCCESSFULLY);
      queryClient.invalidateQueries(["owner"]);
      queryClient.invalidateQueries(["ownerEdit"]);
    },
  });

  const isCurrentIcon = (iconUrl: string) => {
    if (owner?.ownerSingletonInfo.iconUrl === iconUrl) return true;
    return false;
  };

  const handleClick = (id: string) => {
    updateProfileIconMutation(id);
  };

  return (
    <div className={styles.iconSection_mainContainer}>
      {iconCollectionResponse?.map((icon) => (
        <div
          key={icon.code}
          className={styles.iconSection_iconContainer}
          style={{
            border: isCurrentIcon(icon.iconUrl)
              ? `5px solid ${colors.CTX_BORDER_ICON_COLOR}`
              : "none",
          }}
        >
          <IconItem
            isLoading={isUpdateProfileIconLoading}
            icon={icon}
            handleClick={handleClick}
          />
        </div>
      ))}
    </div>
  );
};
