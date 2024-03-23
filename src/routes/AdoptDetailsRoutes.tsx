import { Route, RouteProps, Routes } from "react-router-dom";
import { AdoptDetailsPage } from "../pages/detailsSections/adopts/page";

export const AdoptDetailsRoutes: React.FunctionComponent<RouteProps> = () => {
  return (
    <Routes>
      <Route path="/:adoptId" element={<AdoptDetailsPage />} />
    </Routes>
  );
};
