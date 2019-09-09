import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div id="nav-bar">
      <ul className="ul-drop">
        <li>
          <NavLink className="navlink" exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="navlink" exact to="/restaurants">
            Restaurants
          </NavLink>
        </li>
        <li>
          <NavLink className="navlink" exact to="/other">
            Other
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
