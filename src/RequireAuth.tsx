import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";

export function RequireAuth({ children }: Readonly<{ children: JSX.Element }>) {
  const { user } = useAuth();

  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}