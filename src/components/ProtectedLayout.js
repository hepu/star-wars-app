import { Navigate, Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

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