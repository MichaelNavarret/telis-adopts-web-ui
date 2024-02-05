import { MdFavorite } from "react-icons/md";
import styles from "./FavoriteSelector.module.scss";
import { useTheme } from "../../../context/ThemeProvider";

type FavoriteSelectorProps = {
  isFavorite?: boolean;
};

const FavoriteSelector = (props: FavoriteSelectorProps) => {
  const { isFavorite = false } = props;
  const { colors } = useTheme();
  const iconFavoriteColor = colors.CTX_FORM_CONTAINER_COLOR;
  const pixelSize = "1";

  return (
    <div className={styles.favoriteIconContainer}>
      <MdFavorite
        className={styles.icon}
        style={{
          fontSize: "40px",
          color: "#FF83B3",
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
