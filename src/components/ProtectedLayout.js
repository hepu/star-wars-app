import { Navigate, Outlet } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = ({ children }) => {
  const navigate = useNavigate()
  const {user, logout} = useAuth()
  
  const onLogout = async () => {
    await logout()
    navigate('/')
  }

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {user && <Button variant="primary" type="submit" onClick={onLogout}>
        Logout
      </Button>}
      <Outlet />
    </div>
  );
};