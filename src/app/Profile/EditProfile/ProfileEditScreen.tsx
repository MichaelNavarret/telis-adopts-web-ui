import { useQuery } from "react-query";
import styles from "./ProfileEditScreen.module.scss";
import ProfileEditHeader from "./components/ProfileEditHeader";
import { getOwner } from "../../../api/owners";
import ProfileEditMenubar from "./components/ProfileEditMenubar";
import { useState } from "react";
import ProfileEditSections from "./components/ProfileEditSections";

type ProfileEditScreenProps = {
  ownerId: string;
};

const ProfileEditScreen = (props: ProfileEditScreenProps) => {
  const { ownerId } = props;
  const [step, setStep] = useState(0);

  const { data: ownerResponse } = useQuery({
    queryKey: ["ownerEdit", ownerId],
    queryFn: () => {
      return getOwner(ownerId);
    },
    enabled: !!ownerId,
  });

  const handleStepChange = (value: number) => {
    setStep(value);
  };

  return (
    <div className={styles.editProfileScreen_mainContainer}>
      <div className={styles.editProfileScreen_left_container}>
        <ProfileEditHeader owner={ownerResponse} />
        <ProfileEditMenubar handleStepChange={handleStepChange} />
      </div>
      <div className={styles.editProfileScreen_right_container}>
        <ProfileEditSections owner={ownerResponse} step={step} />
      </div>
    </div>
  );
};

export default ProfileEditScreen;
