import React, { useState } from "react";
import Separator from "../custom/Separator";
import { NavLink } from "react-router-dom";

function PageNav() {
  const [showNavItems, setShowNavItems] = useState(false);

  const toggleNavItems = () => {
    setShowNavItems(!showNavItems);
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <button className="navbar-toggler" type="button" onClick={toggleNavItems}>
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* the show and the empty '' is for the true/false */}
      <div
        className={`collapse navbar-collapse ${showNavItems ? "show" : ""} justify-content-center`}
      >
        <ul className="navbar-nav list-unstyled d-flex justify-content-center ">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>

          <li className="nav-item justify-content-center align-self-center">
            {!showNavItems && <Separator />}
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/customers/list">
              Customers
            </NavLink>
          </li>

          <li className="justify-content-center align-self-center">
            {!showNavItems && <Separator />}
          </li>

          <li className="nav-item ">
            <NavLink className="nav-link" to="/add-customer">
              Add Customer
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default PageNav;
