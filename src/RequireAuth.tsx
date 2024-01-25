import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";

export function RequireAuth({ children }: Readonly<{ children: JSX.Element }>) {
  const { user, token } = useAuth();

  let location = useLocation();

  if (!token && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // return <Navigate to="/home" />;

  return children;
}
