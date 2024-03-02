import { useMutation, useQuery, useQueryClient } from "react-query";
import { OwnerSingletonResponse } from "../../../../../types/owner";
import { getAdopts, getFavoriteCharacters } from "../../../../../api/adopts";
import styles from "./FavoriteSection.module.scss";
import DEFAULT_ICON from "../../../../../assets/utils/not_icon.png";
import { isDefined } from "../../../../../tools/commons";
import { getColorsBySpecie } from "../../../../../constants/colors";
import { useTheme } from "../../../../../context/ThemeProvider";
import { MdFavorite } from "react-icons/md";
import { addFavoriteCharacter } from "../../../../../api/owners";
import { successToast } from "../../../../../constants/toasts";
import strings from "../../../../../l10n";
import { useState } from "react";
import { Pagination } from "@mui/material";

type FavoriteSectionProps = {
  owner?: OwnerSingletonResponse;
};

export const FavoriteSection = (props: FavoriteSectionProps) => {
  const { owner } = props;
  const { colors } = useTheme();
  const iconFavoriteColor = colors.CTX_FORM_CONTAINER_COLOR;
  const queryClient = useQueryClient();
  const pixelSize = "1";
  const [currentPage, setCurrentPage] = useState(0);

  const { data: ownerAdopts } = useQuery({
    queryKey: ["ownerCharacters", owner?.ownerSingletonInfo.id, currentPage],
    queryFn: () => {
      return getAdopts(
        {
          ownerId: owner?.ownerSingletonInfo.id,
          sort: "code:ASC",
        },
        currentPage
      );
    },
    enabled: !!owner,
  });

  const { data: favoriteCharacters } = useQuery({
    queryKey: [
      "favoriteCharacters",
      owner?.ownerSingletonInfo.favoriteCharacters,
    ],
    queryFn: () => {
      return getFavoriteCharacters(owner?.ownerSingletonInfo.id || "");
    },
    enabled: !!owner,
  });

  const { mutate: addFavoriteCharacterMutation } = useMutation({
    mutationFn: (adoptId: string) => {
      return addFavoriteCharacter(owner?.ownerSingletonInfo.id || "", {
        adoptId: adoptId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        "favoriteCharacters",
        owner?.ownerSingletonInfo.favoriteCharacters,
      ]);
      queryClient.invalidateQueries([
        "ownerCharacters",
        owner?.ownerSingletonInfo.id,
      ]);
      queryClient.invalidateQueries(["owner", owner?.ownerSingletonInfo.id]);
      successToast(strings.ADOPT_MARK_AS_FAVORITE_SUCCESSFULLY);
    },
  });

  const isFavorite = (adoptId: string) => {
    return favoriteCharacters?.data.some(
      (character) => character.id === adoptId
    );
  };

  const totalPages = ownerAdopts?.headers["x-pagination-total-pages"];

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber - 1);
  };

  return (
    <>
      <div className={styles.favoriteSection_mainContainer}>
        <div className={styles.favoriteSection_headerContainer}>
          {favoriteCharacters?.data.map((character) => (
            <div
              key={character.id}
              className={styles.favoriteSection_header_icon_container}
            >
              <img
                src={
                  isDefined(character.iconUrl)
                    ? character.iconUrl
                    : DEFAULT_ICON
                }
                className={styles.favoriteSection_header_adoptContainer}
                alt={character.name}
                style={{
                  border:
                    "5px solid " +
                    getColorsBySpecie(character.specieName).borderIcon,
                }}
              />
              <MdFavorite
                className={styles.favoriteSection_favorite_header_icon}
                style={{
                  fontSize: "50px",
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
          ))}
        </div>
        <div
          className={styles.favoriteSection_contentContainer}
          style={{ borderTop: "1px solid " + colors.CTX_BORDER_ICON_COLOR }}
        >
          {ownerAdopts?.data.map((adopt) => (
            <div
              key={adopt.id}
              className={styles.favoriteSection_content_icon_container}
              onClick={() => {
                addFavoriteCharacterMutation(adopt.id);
              }}
            >
              <img
                src={isDefined(adopt.iconUrl) ? adopt.iconUrl : DEFAULT_ICON}
                className={styles.favoriteSection_content_adoptContainer}
                alt={adopt.name}
                style={{
                  border:
                    "5px solid " +
                    getColorsBySpecie(adopt.specieName).borderIcon,
                }}
              />
              {isFavorite(adopt.id) && (
                <MdFavorite
                  className={styles.favoriteSection_favorite_content_icon}
                  style={{
                    fontSize: "60px",
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
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.paginationFooter}>
        <Pagination
          className={styles.pagination}
          page={currentPage + 1}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "black",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: colors.CTX_BUTTON_COLOR,
            },
          }}
          count={Number(totalPages)}
          onChange={(_e, value) => handlePagination(value)}
          variant="outlined"
        />
      </div>
    </>
  );
};
