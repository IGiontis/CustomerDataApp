import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Separator() {
  return <span className="mx-2"> &#124;</span>;
}

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
            <NavLink className="nav-link" to="/pricing">
              Home
            </NavLink>
          </li>

          {/* // todo make them align with other things  below center items doesn't do anything */}

          <li className="nav-item justify-content-center align-self-center">
            {!showNavItems && <Separator />}
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">
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
