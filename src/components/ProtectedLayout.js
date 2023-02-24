import { Navigate, Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';

import MenuBar from "./MenuBar";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = ({ children }) => {
  const {user} = useAuth()

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return (
    <div id="container">
      <MenuBar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};