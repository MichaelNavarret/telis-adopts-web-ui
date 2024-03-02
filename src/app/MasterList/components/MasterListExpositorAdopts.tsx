import { Pagination } from "@mui/material";
import { useTheme } from "../../../context/ThemeProvider";
import { AdoptInfo } from "../../../types/adopt";
import styles from "./MasterListExpositorAdopts.module.scss";
import AdoptCard from "./AdoptCard/AdoptCard";
import { useState } from "react";
import IconAdopt from "../../../components/utils/IconAdopt";
import { Skeleton } from "@mui/material";
import FavoriteSelector from "./FavoriteSelector";
import useUserSession from "../../../hooks/useUserSession";
import { isDefined } from "../../../tools/commons";
import { getColorsBySpecie } from "../../../constants/colors";

export const useMasterListExpositor = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return {
    state: { currentPage, setCurrentPage },
  };
};

type HookMasterListExpositor = ReturnType<
  typeof useMasterListExpositor
>["state"];

type MasterListExpositorAdoptsProps = {
  adopts: AdoptInfo[];
  isLoading?: boolean;
  disabledOnClicked?: boolean;
  onProfile?: boolean;
  totalPages: number;
  state: HookMasterListExpositor;
};

const MasterListExpositorAdopts = (props: MasterListExpositorAdoptsProps) => {
  const {
    adopts,
    isLoading = false,
    disabledOnClicked = false,
    onProfile = false,
    totalPages,
    state,
  } = props;
  const { colors } = useTheme();
  const [openAdoptCard, setOpenAdoptCard] = useState(false);
  const [selectedAdopt, setSelectedAdopt] = useState<AdoptInfo | null>(null);
  const { ownerInfo } = useUserSession();

  const handleIconClick = (adopt: AdoptInfo) => {
    if (disabledOnClicked) return;
    setSelectedAdopt(adopt);
    setOpenAdoptCard(true);
  };

  const searchIsFavorite = (adoptId: string) => {
    if (!isDefined(ownerInfo?.favoriteAdopts)) return false;
    return ownerInfo.favoriteAdopts.includes(adoptId);
  };

  const handlePagination = (pageNumber: number) => {
    state.setCurrentPage(pageNumber - 1);
  };

  return (
    <>
      <div className={styles.adoptsExpositorContainer}>
        {adopts.map((adopt, index) =>
          isLoading ? (
            <Skeleton
              key={adopt.id}
              variant="circular"
              width={190}
              height={190}
              style={{ backgroundColor: colors.CTX_BUTTON_COLOR }}
            />
          ) : (
            <div key={adopt.id} className={styles.adoptIconContainer}>
              <p
                className={styles.adoptCode}
                style={{
                  color: onProfile
                    ? getColorsBySpecie(adopt.specieName.toLocaleLowerCase())
                        .button
                    : colors.CTX_BUTTON_COLOR,
                }}
              >
                {`#${adopt.code}`}
              </p>
              <IconAdopt
                key={adopt.id + index}
                adopt={adopt}
                handleIconClick={handleIconClick}
                width={190}
                specie={adopt.specieName.toLocaleLowerCase()}
                onProfile={onProfile}
              />

              {ownerInfo && !onProfile && (
                <FavoriteSelector
                  isFavorite={searchIsFavorite(adopt.id)}
                  owner={ownerInfo}
                  adoptId={adopt.id}
                />
              )}
            </div>
          )
        )}
        {selectedAdopt && (
          <AdoptCard
            open={openAdoptCard}
            adopt={selectedAdopt}
            handleClose={() => setOpenAdoptCard(false)}
            onProfile={onProfile}
            specie={selectedAdopt.specieName.toLocaleLowerCase()}
          />
        )}
      </div>
      <div className={styles.paginationFooter}>
        <Pagination
          className={styles.pagination}
          page={state.currentPage + 1}
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

export default MasterListExpositorAdopts;
