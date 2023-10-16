import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./navbarr.css"

function NavBar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    const userConfirmed = window.confirm("Are you sure you want to logout?");

    if (userConfirmed) {
      logout();
      // Redirect to a public page
      navigate("/home");
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Stephan Bank</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" activeKey={location.pathname}>
          <Nav.Link as={NavLink} to="/home" data-tooltip="Home Page">
            Home
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/createuser"
            data-tooltip="Create User Page"
          >
            Create User
          </Nav.Link>
          {!user && (
            <Nav.Link as={NavLink} to="/login" data-tooltip="Login Page">
              Login
            </Nav.Link>
          )}
          {user && (
            <>
              <Nav.Link as={NavLink} to="/balance" data-tooltip="Balance Page">
                Balance
              </Nav.Link>
              <Nav.Link as={NavLink} to="/deposit" data-tooltip="Deposit Page">
                Deposit
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/withdraw"
                data-tooltip="Withdraw Page"
              >
                Withdraw
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/transfer"
                data-tooltip="Transfer Page"
              >
                Transfer
              </Nav.Link>
              {user.role === 9 && (
                <Nav.Link
                  as={NavLink}
                  to="/alldata"
                  data-tooltip="All Data Page"
                >
                  All Data
                </Nav.Link>
              )}
            </>
          )}
        </Nav>
        {user && (
    <Nav className="ml-auto">
        <Navbar.Text className="user-name-text">
            Signed in as: <strong>{user.userName}</strong>
        </Navbar.Text>
        <Button variant="outline-primary" className="logout-button" onClick={handleLogout}>
            Logout
        </Button>
    </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
