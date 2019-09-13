import React from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "./SideBar";

function NavBar() {
  return (
    <div>
      <header id="nav-bar" className="site-header">
        <div className="header-container header-main">
          <div className="site-logo">
            <a href="/" title="OmniEats">
              <img
                src="data:image/png;base64,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"
                alt="logo"
                style={{ height: 82, width: 82 }}
              />
            </a>
          </div>
          <div className="header-tools">
            <div className="header-container">
              <div className="header-main">
                <nav>
                  <div>
                    <div>
                      <ul className="ul-drop">
                        <a href="/" className="header-title">
                          OmniEats
                        </a>
                        <div className="ul-contents">
                          <li>
                            <NavLink className="navlink" exact to="/">
                              Home
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="navlink"
                              exact
                              to="/restaurants"
                            >
                              Restaurants
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className="navlink" exact to="/other">
                              Other
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="navlink login-button"
                              exact
                              to="/login"
                            >
                              Login or Register
                            </NavLink>
                          </li>
                        </div>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar />
    </div>
  );
}

export default NavBar;
