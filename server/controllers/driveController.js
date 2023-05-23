const User = require("../models/userModel");
const Drive = require("../models/driveModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

const getDrive = async (req, res, next) => {
  try {
    const drive = await Drive.findById(req.params.jobid);
    return res.send(drive);
  } catch (error) {
    next(error);
  }
};

const getAllDrives = async (req, res, next) => {
  try {
    const drives = await Drive.find();
    return res.send(drives);
  } catch (error) {
    next(error);
  }
};

const addDrive = async (req, res, next) => {
  try {
    const drive = Drive({ ...req.body });

    const result = await drive.save();

    const skillsReq = req.body.tags;

    const users = await User.find({
      isAdmin: false,
      skills: { $in: skillsReq },
    }).select("-password");

    let config = {
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
      },
    };
    let transporter = nodemailer.createTransport(config);

    await Promise.all(
      users.map((ele) => {
        let content = `Hey <b>${ele.fullName},</b><br />A new drive matching your skills has been added<br/>Click here http://127.0.0.1:5173/job/${result._id} for more information`;

        let message = {
          from: process.env.MAIL,
          to: ele.email,
          subject: "A new drive has been added",
          html: content,
        };
        return transporter.sendMail(message);
      })
    );

    if (!result) {
      return res.status(500).send("Unable to create drive");
    }
    return res.status(201).send("Drive created successfully");
  } catch (error) {
    next(error);
  }
};

const sendMessage = async (req, res) => {
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
    res.send(error);
  }
};

module.exports = {
  getDrive,
  getAllDrives,
  addDrive,
  sendMessage,
};
