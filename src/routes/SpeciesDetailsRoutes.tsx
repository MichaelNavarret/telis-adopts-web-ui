import { lazy } from "react";
import { Route, RouteProps, Routes } from "react-router-dom";

const SpeciesDetails = lazy(
  () => import("../pages/detailsSections/species/page")
);

const SpeciesDetailsRoutes: React.FunctionComponent<RouteProps> = () => {
  return (
    <Routes>
      <Route path="/:specieId" element={<SpeciesDetails />} />
    </Routes>
  );
};

export default SpeciesDetailsRoutes;
