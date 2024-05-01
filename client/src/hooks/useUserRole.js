import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { getRole } from "../Api/Auth";

const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getRole(user?.email).then((data) => {
      setRole(data);
      setLoading(false);
    });
  }, [user]);

  return [role, loading];
};

export default useUserRole;
