import { Route, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

export function PrivateRoute({ path, element }: PrivateRouteProps) {
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to="/login" replace />;
  }
}
