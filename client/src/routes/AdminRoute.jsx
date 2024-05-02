import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Shared/Loader";
import useUserRole from "../hooks/useUserRole";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useUserRole();
  const location = useLocation();
  if (isLoading) return <Loader />;
  if (role === "admin") return children;

  return <Navigate to={"/dashboard"} state={{ from: location }} />;
};

export default AdminRoute;
