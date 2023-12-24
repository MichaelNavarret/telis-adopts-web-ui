import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  isAuth: boolean;
  children: JSX.Element;
};

export function ProtectedRoute(props: ProtectedRouteProps) {
  const { isAuth, children } = props;

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
