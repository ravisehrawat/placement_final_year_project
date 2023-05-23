import React, { useState } from "react";
import "../styles/auth.css";
import image from "../assets/contact.png";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

const Contact = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [btnLoading, setBtnLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    email: user.email || "",
    registrationNumber: user.registrationNumber || "",
    message: "",
  });

  const inputChange = (event) => {
    const { name, value } = event.target;
    return setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (formDetails.registrationNumber.length < 10) {
        return toast.error("Registration number must be 10 characters long");
      }
      setBtnLoading(true);
      await toast.promise(
        axios.post(
          `/user/send-message/${user._id}`,
          {
            ...formDetails,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Message sent successfully",
          error: "Unable to send message",
          loading: "Sending message...",
        }
      );
      setBtnLoading(false);
      setFormDetails({ ...formDetails, message: "" });
    } catch (error) {
      setBtnLoading(false);
      return error;
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-layout contact-layout flex-center">
        <div className="auth-form-cont">
          <h1>Contact Us</h1>
          <form
            onSubmit={handleSubmit}
            className="auth-form contact-form"
          >
            <div className="input">
              <input
                type="email"
                name="email"
                value={formDetails.email}
                onChange={inputChange}
                className="input-field"
              />
              <label className="input-label">Email Address</label>
            </div>
            <div className="input">
              <input
                type="number"
                name="registrationNumber"
                value={formDetails.registrationNumber}
                onChange={inputChange}
                className="input-field"
                minLength="5"
              />
              <label className="input-label">Registration Number</label>
            </div>
            <div className="input">
              <input
                type="text"
                name="message"
                value={formDetails.message}
                onChange={inputChange}
                className="input-field"
                minLength="2"
              />
              <label className="input-label">Message</label>
            </div>
            <button
              type="submit"
              className={`btn auth-btn ${btnLoading ? "disable-btn" : ""}`}
            >
              {btnLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
        <div className="auth-image-container flex-center">
          <img
            src={image}
            alt="contact"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
