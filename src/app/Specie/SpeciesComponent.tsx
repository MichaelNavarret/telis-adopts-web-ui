import Button from "../../components/Button";
import CustomizedSnackbar from "../../components/CustomizeSnackBar";
import styles from "./SpeciesComponent.module.scss";
import ImageExpositor from "./components/ImageExpositor";
import { TypeSnackBar } from "../../types/commons";
import { useEffect, useState } from "react";
import { isDefined } from "../../tools/commons";

export const SpeciesComponent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loginSuccess = localStorage.getItem("loginSuccess");
    if (isDefined(loginSuccess)) {
      localStorage.removeItem("loginSuccess");
      setOpen(true);
    }
  });

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
