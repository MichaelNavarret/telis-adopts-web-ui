import MenuBar from "../../components/MenuBar/MenuBar";
import styles from "./AdminSettingsComponent.module.scss";
import { useState } from "react";
import adminSettingsOptions from "./utils/MenuBarOptions";
import SpeciesSection from "./SettingSections/SpeciesSection/SpeciesSection";
import AdoptsSection from "./SettingSections/AdoptsSection/AdoptsSection";
import TraitsSection from "./SettingSections/TraitsSection/TraitsSection";
import OwnersSection from "./SettingSections/OwnersSection/OwnersSection";
import useUserSession from "../../hooks/useUserSession";
import BadgesSection from "./SettingSections/BadgesSection/BadgesSection";

const AdminSettingsComponent = () => {
  const [step, setStep] = useState<number>(0);
  const { ownerInfo } = useUserSession();

  if (ownerInfo?.role.name !== "Admin") {
    return <>You don't have permissions to view this resource</>;
  }

  const handleStep = (value: number) => {
    setStep(value);
  };

  const SettingsContent = (props: { step: number }) => {
    const { step } = props;
    switch (step) {
      case 0:
        return <SpeciesSection />;
      case 1:
        return <TraitsSection />;
      case 2:
        return <AdoptsSection />;
      case 3:
        return <OwnersSection />;
      case 4:
        return <BadgesSection />;
      default:
        return <OwnersSection />;
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.menuBarContainer}>
        <MenuBar options={adminSettingsOptions} handleClick={handleStep} />
      </div>
      <div className={styles.settingsContent}>
        <SettingsContent step={step} />
      </div>
    </div>
  );
};

export default AdminSettingsComponent;
