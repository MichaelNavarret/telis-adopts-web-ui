import { lazy } from "react";
import { Route, RouteProps, Routes } from "react-router-dom";

const Species = lazy(() => import("../pages/species/page"));

const SpeciesRoutes: React.FunctionComponent<RouteProps> = () => {
  return (
    <Routes>
      <Route path="/species" element={<Species />} />
    </Routes>
  );
};

export default SpeciesRoutes;
