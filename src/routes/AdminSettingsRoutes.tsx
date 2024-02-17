import { Route, RouteProps, Routes } from "react-router-dom";
import AdminSettingsPage from "../pages/adminSettings/page";

const AdminSettingsRoutes: React.FunctionComponent<RouteProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminSettingsPage />} />
    </Routes>
  );
};

export default AdminSettingsRoutes;
