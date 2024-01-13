import { Route, RouteProps, Routes } from "react-router";
import MasterListPage from "../pages/masterList/page";

const MasterListRoutes: React.FunctionComponent<RouteProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<MasterListPage />} />
    </Routes>
  );
};

export default MasterListRoutes;
