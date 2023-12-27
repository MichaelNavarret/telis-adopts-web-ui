import styles from "./MainContainer.module.scss";
import SocialNetworksMenu from "../../components/SocialNetworkMenu";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login/page";
import { useEffect } from "react";
import useUserSession from "../../hooks/useUserSession";
import { jwtDecode } from "jwt-decode";
import ApplicationRoutes from "../../routes";
import { Container, ToastContainer } from "../../components";

export const MainContainer = () => {
  const { _loadTokenFromStorage, logout, isAuth, _token } = useUserSession();

  useEffect(() => {
    const interval = setInterval(() => {
      if (_token != null) {
        const decodedToken: any = jwtDecode(_token);
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingTime = decodedToken.exp - currentTime;
        if (remainingTime < 0) {
          logout({
            title: "Session has timed out",
            subTitle: "Please login again",
          });
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [logout, _token, isAuth, _loadTokenFromStorage]);

  useEffect(() => {
    _loadTokenFromStorage();
  }, [_loadTokenFromStorage]);

  let mainContent = <></>;

  if (isAuth === false) {
    mainContent = (
      <Routes>
        <Route path="/login" element={<LoginPage currentStep={0} />} />
        <Route path="/reset-password" element={<LoginPage currentStep={2} />} />
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    );
  } else if (isAuth === true) {
    mainContent = <ApplicationRoutes isAuth={isAuth} />;
  }

  return (
    <Container>
      <div className={styles.backgroundContainer}>
        <SocialNetworksMenu />
        <div className={styles.mainContainer}>
          <ToastContainer />
          {mainContent}
        </div>
      </div>
    </Container>
  );
};

export default MainContainer;
