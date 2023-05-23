import React, { useState } from "react";
import "../styles/auth.css";
import image from "../assets/auth-illus.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export default function SignUp() {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [confPassShow, setConfPassShow] = useState(false);
  const [formDetails, setFormDetails] = useState({
    fullName: "",
    registrationNumber: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const inputChange = (event) => {
    const { name, value } = event.target;
    return setFormDetails({ ...formDetails, [name]: value.trim() });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const {
        fullName,
        registrationNumber,
        phoneNo,
        email,
        password,
        confirmPassword,
      } = formDetails;
      if (registrationNumber.length < 10) {
        return toast.error("Registration number must be 10 characters long");
      } else if (phoneNo.length < 10) {
        return toast.error("Phone number must be 10 characters long");
      } else if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
      }

      setBtnLoading(true);
      await toast.promise(
        axios.post("/user/register", {
          fullName,
          email,
          registrationNumber,
          phoneNo,
          password,
        }),
        {
          success: "User registered successfully",
          error: "Unable to register user",
          loading: "Registering user...",
        }
      );
      setBtnLoading(false);
      return navigate("/login");
    } catch (error) {
      setBtnLoading(false);
      return error;
    }
  };

  return (
    <div className="auth-layout flex-center">
      <div className="auth-form-cont">
        <h1>Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="auth-form auth-signup-form"
        >
          <div className="input">
            <input
              type="text"
              name="fullName"
              value={formDetails.fullName}
              onChange={inputChange}
              required
              minLength="5"
              className="input-field"
            />
            <label className="input-label">Full Name</label>
          </div>
          <div className="input">
            <input
              type="number"
              name="registrationNumber"
              value={formDetails.registrationNumber}
              onChange={inputChange}
              required
              className="input-field"
            />
            <label className="input-label">Registration Number</label>
          </div>
          <div className="input">
            <input
              type="email"
              name="email"
              value={formDetails.email}
              onChange={inputChange}
              required
              className="input-field"
            />
            <label className="input-label">Email</label>
          </div>
          <div className="input">
            <input
              type="number"
              name="phoneNo"
              value={formDetails.phoneNo}
              onChange={inputChange}
              required
              className="input-field"
            />
            <label className="input-label">Phone Number</label>
          </div>
          <div className="password-container">
            <div className="input">
              <input
                type={passShow ? "text" : "password"}
                name="password"
                value={formDetails.password}
                onChange={inputChange}
                minLength="5"
                className="input-field"
                required
              />
              <label className="input-label">Password</label>
            </div>
            {passShow && (
              <AiFillEye
                className="eye-open"
                onClick={() => setPassShow(!passShow)}
              />
            )}
            {!passShow && (
              <AiFillEyeInvisible
                className="eye-close"
                onClick={() => setPassShow(!passShow)}
              />
            )}
          </div>
          <div className="password-container">
            <div className="input">
              <input
                type={confPassShow ? "text" : "password"}
                name="confirmPassword"
                value={formDetails.confirmPassword}
                onChange={inputChange}
                minLength="5"
                className="input-field"
                required
              />
              <label className="input-label">Confirm Password</label>
            </div>
            {confPassShow && (
              <AiFillEye
                className="eye-open"
                onClick={() => setConfPassShow(!confPassShow)}
              />
            )}
            {!confPassShow && (
              <AiFillEyeInvisible
                className="eye-close"
                onClick={() => setConfPassShow(!confPassShow)}
              />
            )}
          </div>
          <button
            type="submit"
            className={`btn signup-btn auth-btn ${
              btnLoading ? "disable-btn" : ""
            }`}
          >
            {btnLoading ? "Registering..." : "Sign Up"}
          </button>
          <p className="auth-text">
            Already have an account?
            <NavLink
              to="/login"
              className={"auth-link"}
            >
              {" "}
              Login
            </NavLink>
          </p>
        </form>
      </div>
      <div className="auth-image-container flex-center">
        <img
          src={image}
          alt="welcome"
        />
        <span className="attribute">
          <a href="https://www.freepik.com/free-vector/key-concept-illustration_14562381.htm#query=login&position=7&from_view=search&track=sph">
            Image by storyset
          </a>{" "}
          on Freepik
        </span>
      </div>
    </div>
  );
}
