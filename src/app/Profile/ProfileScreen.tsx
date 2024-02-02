import { useQuery } from "react-query";
import { useTheme } from "../../context/ThemeProvider";
import useUserSession from "../../hooks/useUserSession";
import styles from "./ProfileScreen.module.scss";
import { getOwner } from "../../api/owners";
import ProfileHeader from "./ProfileHeader";

type ProfileScreenProps = {
  ownerId?: string;
};

const ProfileScreen = (props: ProfileScreenProps) => {
  const { ownerId } = props;
  const { ownerInfo } = useUserSession();
  const { colors } = useTheme();

  const { data: ownerResponse } = useQuery({
    queryKey: ["ownerInfo"],
    queryFn: () => {
      return getOwner(ownerId || "");
    },
    enabled: !!ownerId,
  });

  const canEdit = ownerId === ownerInfo?.id;

  return (
    <div className={styles.profileScreen_MainContainer}>
      <ProfileHeader data={ownerResponse} canEdit={canEdit} />
    </div>
  );
};

export default ProfileScreen;
