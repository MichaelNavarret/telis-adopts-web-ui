import { useTheme } from "../../context/ThemeProvider";
import { OwnerInfo, OwnerSingletonResponse } from "../../types/owner";
import styles from "./ProfileHeader.module.scss";
import { TbSettingsFilled } from "react-icons/tb";
import { NetworkProfile } from "./components/NetworkProfile";
import BadgesExpositor from "../MasterList/components/AdoptCard/BadgesExpositor";

type ProfileHeaderProps = {
  data?: OwnerSingletonResponse;
  canEdit: boolean;
};

const ProfileHeader = (props: ProfileHeaderProps) => {
  const { data } = props;
  const { colors } = useTheme();
  const borderIconColor = colors.CTX_FORM_CONTAINER_COLOR;

  return (
    <div
      className={styles.headerContainer}
      style={{ background: colors.CTX_MENUBAR_COLOR }}
    >
      <div className={styles.informationContainer}>
        <TbSettingsFilled
          className={styles.settingsIcon}
          style={{ color: colors.CTX_MENUBAR_HOVER_COLOR }}
        />
        <img
          src={data?.ownerSingletonInfo.iconUrl || ""}
          alt="Owner Icon"
          width={"100%"}
          className={styles.iconContainer}
          style={{
            borderColor: borderIconColor,
            backgroundColor: borderIconColor,
          }}
        />

        <div
          className={styles.information}
          style={{ background: colors.CTX_FORM_CONTAINER_COLOR }}
        >
          <div
            className={styles.nickname}
            style={{ color: colors.CTX_FORM_TITLE_COLOR }}
          >
            {data?.ownerSingletonInfo?.nickName}
          </div>
          <NetworkProfile className={styles.socialNetworks} />
          <div className={styles.badges}>
            <BadgesExpositor
              badgesCode={data?.badgesCode || []}
              badgeSize={50}
            />
          </div>
        </div>
      </div>
      <div className={styles.favoriteContainer}></div>
    </div>
  );
};

export default ProfileHeader;