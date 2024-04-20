import { MdFavorite } from "react-icons/md";
import styles from "./FavoriteSelector.module.scss";
import { useTheme } from "../../../context/ThemeProvider";
import { OwnerInfo, OwnerUpdateRequest } from "../../../types/owner";
import { useMutation, useQueryClient } from "react-query";
import { updateOwner } from "../../../api/owners";
import { isDefined } from "../../../tools/commons";

type FavoriteSelectorProps = {
  isFavorite?: boolean;
  onProfile?: boolean;
  adoptId: string;
  owner: OwnerInfo;
};

const FavoriteSelector = (props: FavoriteSelectorProps) => {
  const { isFavorite = false, owner, adoptId } = props;
  const { colors } = useTheme();
  const iconFavoriteColor = colors.secondary_color;
  const pixelSize = "1";
  const queryClient = useQueryClient();

  const { mutate: markAsFavoriteMutation } = useMutation({
    mutationFn: (payload: OwnerUpdateRequest) => {
      return updateOwner(owner.id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adopts"]);
    },
  });

  const handleFavoriteClick = () => {
    const newFavoriteAdopts: string[] = isDefined(owner.favoriteAdopts)
      ? owner.favoriteAdopts
      : [];

    if (newFavoriteAdopts.includes(adoptId)) {
      const index = newFavoriteAdopts.indexOf(adoptId);
      newFavoriteAdopts.splice(index, 1);
    } else {
      newFavoriteAdopts.push(adoptId);
    }

    const payload: OwnerUpdateRequest = {
      favoriteAdoptsIds: newFavoriteAdopts,
    };
    markAsFavoriteMutation(payload);
  };

  return (
    <div className={styles.favoriteIconContainer} onClick={handleFavoriteClick}>
      <MdFavorite
        className={styles.icon}
        style={{
          fontSize: "40px",
          color: isFavorite ? "#FF83B3" : "#737383",
          filter: ` drop-shadow(${pixelSize}px 0 0 ${iconFavoriteColor})
          drop-shadow(${pixelSize}px ${pixelSize}px 0 ${iconFavoriteColor})
          drop-shadow(${pixelSize}px -${pixelSize}px 0 ${iconFavoriteColor})
          drop-shadow(0 ${pixelSize}px 0 ${iconFavoriteColor})
          drop-shadow(-${pixelSize}px 0 0 ${iconFavoriteColor})
          drop-shadow(-${pixelSize}px ${pixelSize}px 0 ${iconFavoriteColor})
          drop-shadow(-${pixelSize}px -${pixelSize}px 0 ${iconFavoriteColor})
          drop-shadow(0 -${pixelSize}px 0 ${iconFavoriteColor})`,
        }}
      />
    </div>
  );
};

export default FavoriteSelector;
