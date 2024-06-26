import SocialNetworksMenu from "../../components/NetworkMenu/SocialNetworkMenu";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login/page";
import { useEffect } from "react";
import useUserSession from "../../hooks/useUserSession";
import { jwtDecode } from "jwt-decode";
import ApplicationRoutes from "../../routes";
import { Container } from "../../components";
import { useTheme } from "../../context/ThemeProvider";
import EntryPointContainer from "./components/EntryPointContainer";
import BackgroundContainer from "./components/BackgroundContainer";
import { hideNavigationButtons } from "../../tools/commons";
import SettingsBubbleComponent from "./components/SettingsBubbleComponent";
import { NOT_SHOW_NAVIGATION_BUTTONS } from "../../constants/commons";
import NavigationBubbles from "../../components/surfaces/NavigationBubbles";
import OwnerIconProfile from "./components/OwnerIconProfile";

export const MainContainer = () => {
  const { _loadTokenFromStorage, logout, isAuth, _token, ownerInfo } =
    useUserSession();
  const { colors, background } = useTheme();
  const location = window.location.pathname;

  useEffect(() => {
    const interval = setInterval(() => {
      if (_token != null) {
        const decodedToken: any = jwtDecode(_token);
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingTime = decodedToken.exp - currentTime;
        if (remainingTime < 0) {
          logout();
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

  const isAdmin = ownerInfo?.role.name === "Admin";

  return (
    <Container>
      <BackgroundContainer background={background}>
        {isAuth && !location.includes("/profile") && <OwnerIconProfile />}
        <SocialNetworksMenu />
        {hideNavigationButtons(location, NOT_SHOW_NAVIGATION_BUTTONS) && (
          <NavigationBubbles />
        )}
        <EntryPointContainer
          backGroundColor={isAuth ? colors.secondary_color : "transparent"}
        >
          {mainContent}
          {isAdmin && <SettingsBubbleComponent />}
        </EntryPointContainer>
      </BackgroundContainer>
    </Container>
  );
};

export default MainContainer;
