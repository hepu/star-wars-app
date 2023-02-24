import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

import { useAuth } from "../hooks/useAuth";

const MenuBar = () => {
  const {user, logout} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const onLogin = async () => {
    navigate('/login')
  }
  
  const onLogout = async () => {
    await logout()
  }

  return (
    <Navbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/app">Star Wars</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={location.pathname} className="justify-content-start">
            {user && (
              <>
                <Nav.Link href="/app">Dashboard</Nav.Link>
                <Nav.Link href="/app/films">Films</Nav.Link>
                <Nav.Link href="/app/people">People</Nav.Link>
                <Nav.Link href="/app/planets">Planets</Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="d-flex flex-fill justify-content-end" activeKey="/home">
            {user ? (
              <>
                <Nav.Link className="mx-2">{user.username}</Nav.Link>
                <Button variant="primary" type="submit" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="primary" type="submit" onClick={onLogin}>
                Log In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MenuBar