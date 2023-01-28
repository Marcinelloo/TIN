import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../common/functions/isAuthenticated";

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
