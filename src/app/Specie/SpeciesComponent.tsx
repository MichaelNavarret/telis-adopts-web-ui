import styles from "./SpeciesComponent.module.scss";
import LogoListComponent from "./components/LogoListComponent";

export const SpeciesComponent = () => {
  return (
    <div className={styles.MainContainer}>
      <LogoListComponent />
    </div>
  );
};

export default SpeciesComponent;
