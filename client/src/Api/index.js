import axios from "axios";
import { clearToken } from "./Auth";
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
export default axiosSecure;

// intercept server response
axios.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (
      (err.response && err.response.status === 401) ||
      err.response.status === 403
    ) {
      await clearToken();
      window.location.replace("/login");
    }
    return Promise.reject(err);
  }
);
