import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const isAuthentication = !!localStorage.getItem("userToken");
  return isAuthentication ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
