import React, { useState } from "react";
import "../styles/auth.css";
import image from "../assets/login-illus.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import jwtDecode from "jwt-decode";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

export default function Login() {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [formDetails, setFormDetails] = useState({
    inputField: "",
    password: "",
  });

  const inputChange = (event) => {
    const { name, value } = event.target;
    return setFormDetails({ ...formDetails, [name]: value.trim() });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      setBtnLoading(true);
      const { data } = await toast.promise(
        axios.post("/user/login", formDetails),
        {
          success: "Login successfully",
          error: "Unable to login",
          loading: "Logging user...",
        }
      );
      localStorage.setItem("token", data.token);
      const temp = jwtDecode(data.token);
      localStorage.setItem("userDetails", JSON.stringify(temp.userDetails));
      setBtnLoading(false);
      return navigate("/");
    } catch (error) {
      setBtnLoading(false);
      return error;
    }
  };

  return (
    <div className="auth-layout flex-center">
      <div className="auth-image-container flex-center">
        <img
          src={image}
          alt="welcome"
        />
        <span className="attribute">
          <a href="https://www.freepik.com/free-vector/privacy-policy-concept-illustration_20547283.htm#query=login&position=1&from_view=search&track=sph">
            Image by storyset
          </a>{" "}
          on Freepik
        </span>
      </div>
      <div className="auth-form-cont">
        <h1>Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className="auth-form auth-login-form"
        >
          <div className="input">
            <input
              name="inputField"
              value={formDetails.inputField}
              onChange={inputChange}
              className="input-field"
              required
            />
            <label className="input-label">Email or Registration Number</label>
          </div>
          <div className="password-container">
            <div className="input">
              <input
                type={passShow ? "text" : "password"}
                name="password"
                value={formDetails.password}
                onChange={inputChange}
                className="input-field"
                minLength="5"
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

          <button
            type="submit"
            className={`btn auth-btn ${btnLoading ? "disable-btn" : ""}`}
          >
            {btnLoading ? "Logging In..." : "Login"}
          </button>
          <p className="auth-text">
            Don't have an account?
            <NavLink
              to="/register"
              className={"auth-link"}
            >
              {" "}
              Register
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
