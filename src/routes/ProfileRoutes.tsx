import { Route, RouteProps, Routes } from "react-router-dom";
import ProfileScreenPage from "../pages/profile/page";
import ProfileEditPage from "../pages/profile/[ownerId]/page";

const ProfileRoutes: React.FunctionComponent<RouteProps> = () => {
  return (
    <Routes>
      <Route path="/:ownerId" element={<ProfileScreenPage />} />
      <Route path="/:ownerId/edit" element={<ProfileEditPage />} />
    </Routes>
  );
};

export default ProfileRoutes;
