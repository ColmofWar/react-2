/**
 * Navigation bar component that provides links to different sections of the application.
 * Includes navigation to Home, Snacks menu, Drinks menu, and Add Item page.
 */
import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar() {
  return (
    <div>
      <Navbar expand="md" className="d-flex justify-content-between">
        <NavLink exact to="/" className="navbar-brand">
          Snack or Booze
        </NavLink>

        <Nav className="d-flex flex-row" navbar>
          <NavItem className="mx-2">
            <NavLink to="/snacks">Snacks</NavLink>
          </NavItem>
          <NavItem className="mx-2">
            <NavLink to="/drinks">Drinks</NavLink>
          </NavItem>
          <NavItem className="mx-2">
            <NavLink to="/add">Add Item</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
