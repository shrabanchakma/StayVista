import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Shared/Loader";
import useUserRole from "../hooks/useUserRole";

const HostRoute = ({ children }) => {
  const [role, loading] = useUserRole();
  const location = useLocation();
  if (loading) return <Loader />;
  if (role === "host") return children;

  return <Navigate to={"/dashboard"} state={{ from: location }} />;
};

export default HostRoute;
