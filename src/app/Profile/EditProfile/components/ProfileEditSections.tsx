import { OwnerSingletonResponse } from "../../../../types/owner";
import CharactersSection from "./EditSections/CharactersSection";
import { FavoriteSection } from "./EditSections/FavoirteSection";
import { IconSection } from "./EditSections/IconSection";
import { InformationSection } from "./EditSections/InformationSection";
import { SecuritySection } from "./EditSections/SecuritySection";
import styles from "./ProfileEditSections.module.scss";

type ProfileEditSectionsProps = {
  owner: OwnerSingletonResponse | undefined;
  step: number;
};

const ProfileEditSections = (props: ProfileEditSectionsProps) => {
  const { owner, step } = props;

  const Section = (props: { step: number }) => {
    const step = props.step;
    switch (step) {
      case 0:
        return <InformationSection owner={owner} />;
      case 1:
        return <IconSection owner={owner} />;
      case 2:
        return <CharactersSection owner={owner} />;
      case 3:
        return <FavoriteSection owner={owner} />;
      case 4:
        return <SecuritySection owner={owner} />;
      case 5:
        return <div>My Badges</div>;
    }
  };

  return (
    <div className={styles.profileEditContentSections_mainContainer}>
      <Section step={step} />
    </div>
  );
};

export default ProfileEditSections;
