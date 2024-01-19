import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SpeciesRoutes from "./SpeciesRoutes";
import HomeRoutes from "./HomeRoutes";
import AdminSettingsRoutes from "./AdminSettingsRoutes";
import MasterListRoutes from "./MasterListRoutes";
import SpeciesDetailsRoutes from "./SpeciesDetailsRoutes";

export const DEFAULT_PATH = "/species";

type ApplicationRouteProps = RouteProps & {
  isAuth: boolean;
};

const ApplicationRoutes = (props: ApplicationRouteProps) => {
  const { isAuth } = props;
  return (
    <Routes>
      <Route
        path="/home/*"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <HomeRoutes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-settings/*"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <AdminSettingsRoutes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/species/*"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <SpeciesRoutes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/master-list/*"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <MasterListRoutes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/detailsSections/SpeciesDetails/*"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <SpeciesDetailsRoutes />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to={DEFAULT_PATH} />} />
      <Route path="*" element={<h1> Not found page</h1>} />
    </Routes>
  );
};

export default ApplicationRoutes;
