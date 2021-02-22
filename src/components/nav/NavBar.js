import React from "react";
import { Link } from "react-router-dom";
import "../auth/Login";
import { Logout } from "../auth/Logout";
import "./NavBar.css";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const NavBar = (props) => {
  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link href="/budget">List of Budgets</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/incomes">List of Incomes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Button
            variant="secondary"
            style={{
              color: "black",
              boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
            }}
            className="logoutBtn"
            onClick={Logout()}
          >
            Logout
          </Button>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};
