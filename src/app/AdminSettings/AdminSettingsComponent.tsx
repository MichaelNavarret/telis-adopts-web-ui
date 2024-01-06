import MenuBar from "../../components/MenuBar/MenuBar";
import styles from "./AdminSettingsComponent.module.scss";
import { useState } from "react";
import adminSettingsOptions from "./utils/MenuBarOptions";
import SpeciesSection from "./SettingSections/SpeciesSection";
import AdoptsSection from "./SettingSections/AdoptsSection";
import TraitsSection from "./SettingSections/TraitsSection";

const AdminSettingsComponent = () => {
  const [step, setStep] = useState<number>(0);

  const handleStep = (value: number) => {
    setStep(value);
  };

  const SettingsContent = (props: { step: number }) => {
    const { step } = props;
    switch (step) {
      case 0:
        return <AdoptsSection />;
      case 1:
        return <SpeciesSection />;
      case 2:
        return <TraitsSection />;
      default:
        return <SpeciesSection />;
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
