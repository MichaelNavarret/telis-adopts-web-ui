import Button from "../../components/Button";
import styles from "./SpeciesComponent.module.scss";
import ImageExpositor from "./components/ImageExpositor";

export const SpeciesComponent = () => {
  return (
    <div className={styles.MainContainer}>
      <div className={styles.speciesContainer}>
        <ImageExpositor
          src="src\assets\logos\lannies.png"
          alt="lannies_logo"
          classNameImage={styles.lanniesLogo}
        />
        <ImageExpositor
          src="src\assets\logos\plunies.png"
          alt="plunies_logo"
          classNameImage={styles.pluniesLogo}
        />
        <ImageExpositor
          src="src\assets\logos\cloudyStars.png"
          alt="cloudyStars_logo"
          classNameImage={styles.pluniesLogo}
        />
        <ImageExpositor
          src="src\assets\logos\spectraLumens.png"
          alt="spectraLumens_logo"
          classNameImage={styles.spectraLumenLogo}
        />
      </div>
      <Button>
        <p>Nonspecies</p>
        <p>Adopts</p>
      </Button>
    </div>
  );
};

export default SpeciesComponent;
