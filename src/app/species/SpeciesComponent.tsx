import styles from "./SpeciesComponent.module.scss";
import ImageExpositor from "./components/ImageExpositor";

type SpeciesComponentProps = {
  colorButton?: string;
  colorTextButton?: string;
  buttonColorShadow?: string;
};

export const SpeciesComponent = (props: SpeciesComponentProps) => {
  const {
    colorButton = "#F784A1",
    colorTextButton = "#fef1df",
    buttonColorShadow = "#8B457E",
  } = props;
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
      <div
        className={styles.buttonStyles}
        style={{
          backgroundColor: colorButton,
          color: colorTextButton,
          boxShadow: `0 0 10px ${buttonColorShadow}`,
        }}
      >
        <p>Nonspecies</p>
        <p>Adopts</p>
      </div>
    </div>
  );
};

export default SpeciesComponent;
