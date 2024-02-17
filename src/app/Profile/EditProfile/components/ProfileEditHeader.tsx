import { useTheme } from "../../../../context/ThemeProvider";
import { OwnerSingletonResponse } from "../../../../types/owner";
import styles from "./ProfileEditHeader.module.scss";

type ProfileEditHeaderProps = {
  owner?: OwnerSingletonResponse;
};

const ProfileEditHeader = (props: ProfileEditHeaderProps) => {
  const { owner } = props;
  const { colors } = useTheme();
  const borderIconColor = colors.CTX_BUTTON_COLOR;
  return (
    <>
      <img
        src={owner?.ownerSingletonInfo.iconUrl}
        alt="Profile"
        className={styles.profileEditHeader_icon}
        style={{
          borderColor: borderIconColor,
          backgroundColor: borderIconColor,
        }}
      />
    </>
  );
};

export default ProfileEditHeader;
