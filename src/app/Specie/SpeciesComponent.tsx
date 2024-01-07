import CustomizedSnackbar from "../../components/utils/CustomizeSnackBar";
import styles from "./SpeciesComponent.module.scss";
import { useEffect, useState } from "react";
import { isDefined } from "../../tools/commons";
import LogoListComponent from "./components/LogoListComponent";
import strings from "../../l10n";

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
      <LogoListComponent />
      <CustomizedSnackbar
        type="success"
        subTitle={strings.LOGIN_SUCCESSFULLY}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </div>
  );
};

export default SpeciesComponent;
