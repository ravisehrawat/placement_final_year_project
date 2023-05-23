import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faFigma,
  faGithub,
  faLinkedin,
  faTwitter,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-left">
            <div className="heading">Placeit</div>
            <p>
              If you have any questions or feedback, please do not hesitate to
              contact us. We are always looking for ways to improve our services
              and welcome your input.
            </p>
            <div className="socials">
              <a
                href="/"
                target={"_blank"}
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="/"
                target={"_blank"}
                aria-label="Linkedin"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="/"
                target={"_blank"}
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="/"
                target={"_blank"}
                aria-label="Github"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="/"
                target={"_blank"}
                aria-label="Figma"
              >
                <FontAwesomeIcon icon={faFigma} />
              </a>
              <a
                href="/"
                target={"_blank"}
                aria-label="Whatsapp"
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a
                href="youtube.com"
                target={"_blank"}
                aria-label="Youtube"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
          <ul className="footer-right">
            <li className="menu">
              <h2>About</h2>
              <ul className="box">
                <li>
                  <NavLink to="/stats">Placement Stats</NavLink>
                </li>
                <li>
                  <NavLink to="/blogs">Blogs</NavLink>
                </li>
                <li>
                  <NavLink to="/careers">Careers</NavLink>
                </li>
                <li>
                  <NavLink to="/drives">Drives</NavLink>
                </li>
              </ul>
            </li>
            <li className="menu">
              <h2>Support</h2>
              <ul className="box">
                <li>
                  <NavLink to="/contact">Contact Us</NavLink>
                </li>
                <li>
                  <a href="/">Facebook</a>
                </li>
                <li>
                  <a href="/">Linkedin</a>
                </li>
                <li>
                  <a href="/">Twitter</a>
                </li>
              </ul>
            </li>
            <li className="menu">
              <h2>Links</h2>
              <ul className="box">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/applications">Applications</NavLink>
                </li>
                <li>
                  <NavLink to="/drives">Jobs</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>© 2023-2023, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
