import { useQuery } from "react-query";
import { useTheme } from "../../context/ThemeProvider";
import useUserSession from "../../hooks/useUserSession";
import styles from "./ProfileScreen.module.scss";
import { getOwner } from "../../api/owners";
import ProfileHeader from "./ProfileHeader";
import ProfileButtons from "./ProfileButtons";
import { useState } from "react";
import ProfileCharactersSection from "./ProfileSections/ProfileCharactersSection";

type ProfileScreenProps = {
  ownerId?: string;
};

const ProfileScreen = (props: ProfileScreenProps) => {
  const { ownerId } = props;
  const { ownerInfo } = useUserSession();
  const [selectedButton, setSelectedButton] = useState("");
  const { colors } = useTheme();

  const { data: ownerResponse } = useQuery({
    queryKey: ["ownerInfo"],
    queryFn: () => {
      return getOwner(ownerId || "");
    },
    enabled: !!ownerId,
  });

  const canEdit = ownerId === ownerInfo?.id;

  const handleButtonSelection = (button: string) => {
    setSelectedButton(button);
  };

  const ProfileSection = (props: { selectedButton: string }) => {
    const { selectedButton } = props;
    if (selectedButton === "Characters") {
      return <ProfileCharactersSection ownerId={ownerId || ""} />;
    }

    return <></>;
  };

  return (
    <div className={styles.profileScreen_MainContainer}>
      <ProfileHeader data={ownerResponse} canEdit={canEdit} />
      <ProfileButtons handleButtonSelection={handleButtonSelection} />
      <ProfileSection selectedButton={selectedButton} />
    </div>
  );
};

export default ProfileScreen;
