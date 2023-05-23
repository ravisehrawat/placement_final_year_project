const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.user).select("-password");
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ incharge: false }).select("-password");
    return res.send(users);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const query = req.body.inputField;

    const alreadyPresent = await User.findOne({
      $or: [
        { email: query },
        { registrationNumber: isNaN(query) ? null : query },
      ],
    });

    if (!alreadyPresent) {
      return res.status(400).send("Incorrect credentials");
    }
    const verifyPass = await bcrypt.compare(
      req.body.password,
      alreadyPresent.password
    );
    if (!verifyPass) {
      return res.status(400).send("Incorrect credentials");
    }
    alreadyPresent.password = undefined;

    const token = jwt.sign(
      { userDetails: alreadyPresent },
      process.env.JWT_SECRET,
      {
        expiresIn: "2 days",
      }
    );
    return res.status(201).send({ msg: "User logged in successfully", token });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const regisPresent = await User.findOne({
      registrationNumber: req.body.registrationNumber,
    });
    if (regisPresent) {
      return res.status(400).send("Registration number already exists");
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = await User({
      ...req.body,
      password: hashedPass,
      pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    });
    const result = await user.save();
    if (!result) {
      return res.status(500).send("Unable to register user");
    }
    return res.status(201).send("User registered successfully");
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const result1 = await User.findByIdAndUpdate(
      { _id: req.user },

      { ...req.body }
    );
    if (!result1) {
      return res.status(500).send("Unable to update user");
    }
    const data = await User.findById(req.user).select("-password");

    return res.status(201).send({ msg: "User updated successfully", data });
  } catch (error) {
    next(error);
  }
};

const makeCoordinator = async (req, res, next) => {
  try {
    await Promise.all(
      req.body.arr.map((ele) => {
        return User.findByIdAndUpdate({ _id: ele._id }, { coordinator: true });
      })
    );

    return res
      .status(201)
      .send({ msg: "Students made coordinators successfully" });
  } catch (error) {
    next(error);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    let config = {
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);

    const content = `<b>Email address: </b>${req.body.email}<br /><b>Registration Number: </b>${req.body.registrationNumber}<br /><b>Message: </b>${req.body.message}`;

    let message = {
      from: req.body.email,
      to: process.env.MAIL,
      subject:
        "Message from registration number " + req.body.registrationNumber,
      html: content,
    };

    let info = await transporter.sendMail(message);

    return res.status(201).send("Message sent");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  getAllUsers,
  login,
  register,
  updateProfile,
  makeCoordinator,
  sendMessage,
};
