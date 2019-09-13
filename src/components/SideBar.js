import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div style={{marginTop: 90, width: 162}}>
      Categories
      <br />
      <NavLink to="/meat">Meat</NavLink>
      <br />
      <NavLink to="/mixed">Mixed</NavLink>
      <br />
      <NavLink to="/veggie">Veggie</NavLink>
    </div>
  );
}

export default SideBar;
