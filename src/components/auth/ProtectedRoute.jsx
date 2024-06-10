
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;

