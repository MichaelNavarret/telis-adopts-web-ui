import styles from "./MainContainer.module.scss";
import SocialNetworksMenu from "../../components/SocialNetworkMenu";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login/page";

export const MainContainer = () => {
  return (
    <div className={styles.backgroundContainer}>
      <SocialNetworksMenu />
      <div className={styles.mainContainer}>
        <Routes>
          <Route path="/login" element={<LoginPage currentSetp={0} />} />
          <Route
            path="/reset-password"
            element={<LoginPage currentSetp={2} />}
          />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainContainer;
