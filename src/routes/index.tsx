import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SpeciesRoutes from "./SpeciesRoutes";
import HomeRoutes from "./HomeRoutes";

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
        path="/species/*"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <SpeciesRoutes />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to={DEFAULT_PATH} />} />
      <Route path="*" element={<h1> Not found page</h1>} />
    </Routes>
  );
};

export default ApplicationRoutes;
