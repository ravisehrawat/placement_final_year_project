import React from "react";
import Navbar from "../components/Navbar";
import error from "../assets/Ilustration.jpg";
import "../styles/error.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";

function Error() {
  return (
    <>
      <Navbar />
      <div className="container error-body">
        <div className="error-body-l">
          <div className="description">
            <h1>Oops...</h1>
            <h2>Page not found </h2>
            <p>
              This Page doesn't exist or was removed!<br></br>
              We suggest you back to home.
            </p>
          </div>
          <NavLink
            to="/"
            className="btn error-btn"
          >
            <AiOutlineArrowLeft />
            <span className="text">Back To Home</span>
          </NavLink>
        </div>
        <div className="error-img flex-center">
          <img
            src={error}
            alt="error-jpg"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Error;
