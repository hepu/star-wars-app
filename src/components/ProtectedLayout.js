import { Navigate, Outlet, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = ({ children }) => {
  const {user, logout} = useAuth()
  
  const onLogout = async () => {
    await logout()
  }

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return (
    <div id="container">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/app">Star Wars</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/app">Home</Nav.Link>
            <Nav.Link href="/app/planets">Planets</Nav.Link>
            <NavDropdown title="My Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.3">Logged in as: {user && user.username}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                {user && (
                  <Button variant="primary" type="submit" onClick={onLogout}>
                    Logout
                  </Button>
                )}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};