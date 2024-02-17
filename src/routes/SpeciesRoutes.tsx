import { Route, RouteProps, Routes } from "react-router-dom";
import SpeciesPage from "../pages/species/page";

const SpeciesRoutes: React.FunctionComponent<RouteProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<SpeciesPage />} />
    </Routes>
  );
};

export default SpeciesRoutes;
