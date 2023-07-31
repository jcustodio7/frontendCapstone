import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./components.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./components.css";
import logo from "./img/logo.png";
const Header = () => {
  const isAuthenticated = localStorage.getItem("userToken");
  let userName = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.clear();
    navigate("/login");
  };

  const handleClickStore = (e) => {
    navigate("/shopstore");
  };
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/login">
            <img
              style={{ width: 50, height: 50 }}
              src={logo}
              alt="react logo"
            ></img>
            &nbsp; Dental Shop Dashboard
          </Navbar.Brand>
          <Nav className="me-auto navBar navTexts">
            <Link
              className="navBarTexts"
              to="/shopview"
              href="#home"
              style={{ textDecoration: "none" }}
            >
              Shop View
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  className="navBarTexts"
                  to="/products"
                  href="#home"
                  style={{ textDecoration: "none" }}
                >
                  Product Lists
                </Link>
                {/* <Link
                  to="/addProduct"
                  href="#home"
                  style={{ textDecoration: "none" }}
                >
                  Input a product
                </Link> */}
                {/* <Link to="/updateProduct" href="#home">
                  Update Product
                </Link> */}
                <Link
                  className="navBarTexts"
                  to="/admins"
                  href="#home"
                  style={{ textDecoration: "none" }}
                >
                  Admins
                </Link>
                <Link
                  className="navBarTexts"
                  to="/customers"
                  href="#home"
                  style={{ textDecoration: "none" }}
                >
                  Customers
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="navBarTexts"
                  to="/login"
                  href="#home"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Link>
                <Link
                  className="navBarTexts"
                  to="/register"
                  href="#home"
                  style={{ textDecoration: "none" }}
                >
                  Register
                </Link>
              </>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <NavDropdown
                className="userDropdown"
                title={userName && userName.data.user.name}
                id="nav-dropdown"
              >
                <NavDropdown.Item
                  eventKey="4.1"
                  onClick={(e) => handleClickStore()}
                >
                  Shop Store
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey="4.1"
                  onClick={(e) => handleLogout()}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
