import React from "react";
import { NavLink } from "react-router-dom";
import image from "../assets/hero.png";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>Welcome to Placeit</h1>
          <p>
            Our platform is designed to connect candidates and placement
            in-charges in a seamless and efficient way. Whether you are a
            candidate seeking job opportunities or a placement in-charge looking
            to streamline the recruitment process, we have got you covered.
          </p>
          <div className="hero-btn-container">
            <NavLink
              to={"/drives"}
              className="btn invert-btn"
            >
              All Drives
            </NavLink>
            <NavLink
              to={"/applications"}
              className="btn"
            >
              My Applications
            </NavLink>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src={image}
            alt="hero"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
