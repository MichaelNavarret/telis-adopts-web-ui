import { Route, RouteProps, Routes } from "react-router-dom";
import SpeciesDetailsPage from "../pages/detailsSections/species/page";

const SpeciesDetailsRoutes: React.FunctionComponent<RouteProps> = () => {
  return (
    <Routes>
      <Route path="/:specieId" element={<SpeciesDetailsPage />} />
    </Routes>
  );
};

export default SpeciesDetailsRoutes;
