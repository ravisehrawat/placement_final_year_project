import React, { useState } from "react";
import "../styles/navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

function Navbar() {
  const [iconActive, setIconActive] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const logoutFunc = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    setUser(null);
    navigate("/login");
  };

  return (
    <header>
      <h2 className="logo flex-center">Placeit</h2>
      <nav className={iconActive ? "nav-active" : ""}>
        <ul className="nav-link">
          <li>
            <NavLink
              to="/"
              className="home"
              onClick={() => {
                setIconActive(false);
              }}
            >
              Home
            </NavLink>
          </li>
          {user.incharge && (
            <li>
              <NavLink
                to="/users"
                className="users"
                onClick={() => {
                  setIconActive(false);
                }}
              >
                Users
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/drives"
              className="drive"
              onClick={() => {
                setIconActive(false);
              }}
            >
              Drives
            </NavLink>
          </li>
          {!user.incharge && (
            <li>
              <NavLink
                to="/applications"
                className="applications"
                onClick={() => {
                  setIconActive(false);
                }}
              >
                Applications
              </NavLink>
            </li>
          )}
          {(user.incharge || user.coordinator) && (
            <li>
              <NavLink
                to="/applicants"
                className="applicants"
                onClick={() => {
                  setIconActive(false);
                }}
              >
                Applicants
              </NavLink>
            </li>
          )}
          {!user.incharge && (
            <li>
              <NavLink
                to="/profile"
                className="profile"
                onClick={() => {
                  setIconActive(false);
                }}
              >
                Profile
              </NavLink>
            </li>
          )}
          {!user.incharge && (
            <li>
              <NavLink
                to="/contact"
                className="contact"
                onClick={() => {
                  setIconActive(false);
                }}
              >
                Contact Us
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      {user ? (
        <button
          className="btn nav-btn flex-center"
          onClick={logoutFunc}
        >
          Log Out
        </button>
      ) : (
        <NavLink
          to="/register"
          className="btn nav-btn flex-center"
        >
          Register / Login
        </NavLink>
      )}
      <div className="menu-icons">
        {!iconActive && (
          <FiMenu
            className="menu-open"
            onClick={() => {
              setIconActive(true);
            }}
          />
        )}
        {iconActive && (
          <RxCross1
            className="menu-close"
            onClick={() => {
              setIconActive(false);
            }}
          />
        )}
      </div>
    </header>
  );
}

export default Navbar;
