import CustomizedSnackbar from "../../components/CustomizeSnackBar";
import styles from "./SpeciesComponent.module.scss";
import ImageExpositor from "./components/ImageExpositor";
import { useEffect, useState } from "react";
import { isDefined } from "../../tools/commons";
import {
  CLOUDY_STARS_LOGO,
  LANNIES_LOGO,
  PLUNIES_LOGO,
  SPECTRALUMEN_LOGO,
} from "../../constants/logos";
import { useTheme } from "../../context/ThemeProvider";

export const SpeciesComponent = () => {
  const [open, setOpen] = useState(false);
  const { reloadTheme } = useTheme();

  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");
    if (isDefined(loginSuccess)) {
      localStorage.removeItem("loginSuccess");
      setOpen(true);
    }
  });

  const handleResetColors = (specie: string) => {
    localStorage.setItem("specie", specie);
    reloadTheme();
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.speciesContainer}>
        <ImageExpositor
          src={LANNIES_LOGO}
          alt="lannies_logo"
          classNameImage={styles.lanniesLogo}
          onClick={() => handleResetColors("lannies")}
        />
        <ImageExpositor
          src={PLUNIES_LOGO}
          alt="plunies_logo"
          classNameImage={styles.pluniesLogo}
          onClick={() => handleResetColors("plunies")}
        />
        <ImageExpositor
          src={CLOUDY_STARS_LOGO}
          alt="cloudyStars_logo"
          classNameImage={styles.pluniesLogo}
          onClick={() => handleResetColors("cloudystars")}
        />
        <ImageExpositor
          src={SPECTRALUMEN_LOGO}
          alt="spectraLumens_logo"
          classNameImage={styles.spectraLumenLogo}
          onClick={() => handleResetColors("spectralumen")}
        />
      </div>
      {/* <Button>
        <p>Nonspecies</p>
        <p>Adopts</p>
      </Button> */}
      <CustomizedSnackbar
        type="success"
        subTitle="Login Successfully!"
        open={open}
        handleClose={() => setOpen(false)}
      />
    </div>
  );
};

export default SpeciesComponent;
