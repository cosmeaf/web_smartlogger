import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import LogoutModal from "./LogoutModal";
import LoadPage from "./LoadPage";
import "../components/css/Header.css";

const HeaderLoggedIn = () => {
  const { authTokens, logoutUser } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    setShowLogoutModal(true);
    await logoutUser();
    setLoading(false);
  };

  const username = authTokens?.user || "Guest";

  return (
    <>
      {loading && <LoadPage />}
      <Navbar bg="dark" variant="dark" expand="lg" className="header">
        <Container>
          <Navbar.Brand as={Link} to="/">
            MyApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title={username} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/setup">
                  Setup
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LogoutModal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
      />
    </>
  );
};

export default HeaderLoggedIn;
