import { Navigate, useLocation } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase.init';

const PrivateRoute = ({children}) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/register" state={{from: location.pathname}} replace />;
  }
  return children;
};

export default PrivateRoute;
