import { Route, RouteProps, Routes } from "react-router-dom";
import HomePage from "../pages/home/page";

const HomeRoutes: React.FunctionComponent<RouteProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default HomeRoutes;
