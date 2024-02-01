import { useTheme } from "../../context/ThemeProvider";
import { OwnerInfo } from "../../types/owner";
import styles from "./ProfileHeader.module.scss";
import { TbSettingsFilled } from "react-icons/tb";

type ProfileHeaderProps = {
  owner?: OwnerInfo;
  canEdit: boolean;
};

const ProfileHeader = (props: ProfileHeaderProps) => {
  const { owner } = props;
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
          src={owner?.iconUrl}
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
        ></div>
      </div>
      <div className={styles.favoriteContainer}></div>
    </div>
  );
};

export default ProfileHeader;
