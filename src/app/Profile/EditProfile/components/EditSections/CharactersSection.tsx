import { useQuery } from "react-query";
import { getAdopts } from "../../../../../api/adopts";
import { OwnerSingletonResponse } from "../../../../../types/owner";
import styles from "./CharactersSection.module.scss";
import { isDefined } from "../../../../../tools/commons";
import DEFAULT_ICON from "../../../../../assets/utils/not_icon.png";
import { useTheme } from "../../../../../context/ThemeProvider";
import { TbSettingsFilled } from "react-icons/tb";
import { useState } from "react";
import UpdateAdoptDialog from "./UpdateAdoptDialog";
import { AdoptInfo } from "../../../../../types/adopt";
import { getColorsBySpecie } from "../../../../../constants/colors";

type CharactersSectionProps = {
  owner: OwnerSingletonResponse | undefined;
};

const CharactersSection = (props: CharactersSectionProps) => {
  const { owner } = props;
  const { colors } = useTheme();
  const pixelSize = "1";
  const settingIconColor = colors.CTX_FORM_CONTAINER_COLOR;
  const [openEditAdoptDialog, setOpenEditAdoptDialog] = useState(false);
  const [selectedAdopt, setSelectedAdopt] = useState<AdoptInfo | undefined>(
    undefined
  );

  const { data: ownerAdopts, isLoading } = useQuery({
    queryKey: ["ownerCharacters", owner?.ownerSingletonInfo.id],
    queryFn: () => {
      return getAdopts({
        ownerId: owner?.ownerSingletonInfo.id,
        sort: "code:ASC",
      });
    },
    enabled: !!owner,
  });

  const handleSettingsClick = (adopt: AdoptInfo) => {
    setSelectedAdopt(adopt);
    setOpenEditAdoptDialog(true);
  };

  return (
    <div className={styles.charactersSection_mainContainer}>
      {ownerAdopts?.data.map((adopt) => (
        <div
          key={"adopt_container_" + adopt.id}
          className={styles.charactersSection_adoptContainer}
        >
          <div
            key={adopt.name}
            className={styles.charactersSection_adoptContainer_title}
            style={{ color: getColorsBySpecie(adopt.specieName).button }}
          >
            {adopt.name}
          </div>
          <img
            key={adopt.iconUrl}
            src={isDefined(adopt.iconUrl) ? adopt.iconUrl : DEFAULT_ICON}
            alt={adopt.name}
            className={styles.charactersSection_adoptContainer_icon}
            style={{
              border:
                "5px solid " + getColorsBySpecie(adopt.specieName).borderIcon,
            }}
          />
          <TbSettingsFilled
            className={styles.charactersSection_adoptContainer_settingsIcon}
            onClick={() => handleSettingsClick(adopt)}
            style={{
              color: getColorsBySpecie(adopt.specieName).button,
              filter: ` drop-shadow(${pixelSize}px 0 0 ${settingIconColor})
                drop-shadow(${pixelSize}px ${pixelSize}px 0 ${settingIconColor})
                drop-shadow(${pixelSize}px -${pixelSize}px 0 ${settingIconColor})
                drop-shadow(0 ${pixelSize}px 0 ${settingIconColor})
                drop-shadow(-${pixelSize}px 0 0 ${settingIconColor})
                drop-shadow(-${pixelSize}px ${pixelSize}px 0 ${settingIconColor})
                drop-shadow(-${pixelSize}px -${pixelSize}px 0 ${settingIconColor})
                drop-shadow(0 -${pixelSize}px 0 ${settingIconColor})`,
            }}
          />
        </div>
      ))}
      {selectedAdopt && (
        <UpdateAdoptDialog
          open={openEditAdoptDialog}
          handleClose={() => setOpenEditAdoptDialog(false)}
          adopt={selectedAdopt}
        />
      )}
    </div>
  );
};

export default CharactersSection;
