import { useNavigate } from "react-router-dom";
import {
  CLOUDY_STARS_LOGO,
  LANIES_LOGO,
  PLUNIES_LOGO,
  SPECTRALUMEN_LOGO,
} from "../../../constants/logos";
import { useTheme } from "../../../context/ThemeProvider";
import styles from "../SpeciesComponent.module.scss";
import ImageExpositor from "./ImageExpositor";

const LogoListComponent = () => {
  const { reloadTheme } = useTheme();
  const navigate = useNavigate();

  const handleClick = (specie: string) => {
    localStorage.setItem("specie", specie);
    reloadTheme();
    navigate("/home");
  };

  return (
    <div className={styles.speciesContainer}>
      <ImageExpositor
        src={LANIES_LOGO}
        alt="lanies_logo"
        classNameImage={styles.laniesLogo}
        onClick={() => handleClick("lanies")}
      />
      <ImageExpositor
        src={PLUNIES_LOGO}
        alt="plunies_logo"
        classNameImage={styles.pluniesLogo}
        onClick={() => handleClick("plunies")}
      />
      <ImageExpositor
        src={CLOUDY_STARS_LOGO}
        alt="cloudyStars_logo"
        classNameImage={styles.pluniesLogo}
        onClick={() => handleClick("cloudystars")}
      />
      <ImageExpositor
        src={SPECTRALUMEN_LOGO}
        alt="spectraLumens_logo"
        classNameImage={styles.spectraLumenLogo}
        onClick={() => handleClick("spectralumen")}
      />
    </div>
  );
};

export default LogoListComponent;
