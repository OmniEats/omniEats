import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux"
import Sidebar from "./SideBar";
import images from "../assets/images"
import { logoutUser } from "../store";

function NavBar({ loggedInUser, logout }) {
  return (
    <div>
      <header id="nav-bar" className="site-header">
        <div className="header-container header-main">
          <div className="site-logo">
            <a href="/" title="OmniEats">
              <img
                src={images.logo}
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
                        {loggedInUser.fullName ? <h2 style={{color: 'white'}}>Welcome {loggedInUser.fullName}</h2> : ''}
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
                            {!loggedInUser.id ?
                            <NavLink
                              className="navlink login-button"
                              exact
                              to="/login"
                            >
                              Login or Register
                            </NavLink>
                            :
                            <button type="submit" className="login-button" onClick={() => logout()}>
                              Logout
                            </button>
                            }
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

const stateToProps = ({ loggedInUser }) => {
  return {
    loggedInUser
  }
}

const dispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser())
  }
}

export default connect(stateToProps,dispatchToProps)(NavBar);
