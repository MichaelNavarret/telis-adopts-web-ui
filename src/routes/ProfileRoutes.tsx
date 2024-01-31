import { Route, RouteProps, Routes } from "react-router-dom";
import ProfileScreenPage from "../pages/profile/page";

const ProfileRoutes: React.FunctionComponent<RouteProps> = () => {
  return (
    <Routes>
      <Route path="/:ownerId" element={<ProfileScreenPage />} />
    </Routes>
  );
};

export default ProfileRoutes;
