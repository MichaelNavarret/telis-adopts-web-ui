import CustomizedSnackbar from "../../components/CustomizeSnackBar";
import styles from "./SpeciesComponent.module.scss";
import { useEffect, useState } from "react";
import { isDefined } from "../../tools/commons";
import LogoListComponent from "./components/LogoListComponent";

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
      {/* <Button>
        <p>Nonspecies</p>
        <p>Adopts</p>
      </Button> */}
      <LogoListComponent />

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
