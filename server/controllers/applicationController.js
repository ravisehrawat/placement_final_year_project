const Application = require("../models/applicationModel");
const User = require("../models/userModel");

const nodemailer = require("nodemailer");
require("dotenv").config();

const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({
      userId: req.params.id,
    }).populate("driveId");

    return res.send(applications);
  } catch (error) {
    next(error);
  }
};

const getPlacedStats = async (req, res, next) => {
  try {
    const users = await User.find({ coordinator: false }).count();
    const applications = await Application.find().populate("userId");
    let branches = {};
    applications.forEach((appl) => {
      if (appl.status === "Selected") {
        if (appl.userId.branch in branches) {
          branches[appl.userId.branch]++;
        } else branches[appl.userId.branch] = 1;
      }
    });

    return res.send({ branches, totalStudents: users });
  } catch (error) {
    next(error);
  }
};

const getPackageStats = async (req, res, next) => {
  try {
    const applications = await Application.find()
      .populate("userId")
      .populate("driveId");
    let branches = {
      cse: 0,
      eee: 0,
      ece: 0,
      civil: 0,
      mech: 0,
      chem: 0,
      bioTech: 0,
      metal: 0,
    };
    applications.forEach((appl) => {
      if (appl.status === "Selected") {
        if (branches[appl.userId.branch] < appl.driveId.salary) {
          branches[appl.userId.branch] = appl.driveId.salary;
        }
      }
    });

    return res.send(branches);
  } catch (error) {
    next(error);
  }
};

const getAllApplications = async (req, res, next) => {
  try {
    const applications = await Application.find()
      .populate("userId")
      .populate("driveId");
    return res.send(applications);
  } catch (error) {
    next(error);
  }
};

const createApplication = async (req, res, next) => {
  try {
    const present = await Application.find({
      userId: req.params.id,
      driveId: req.body.driveId,
    });

    if (present[0]) {
      return res.status(400).send("Already applied");
    }

    const application = Application({
      userId: req.params.id,
      driveId: req.body.driveId,
    });

    await application.save();

    return res.status(201).send("Applied successfully");
  } catch (error) {
    next(error);
  }
};

const shortlistApplication = async (req, res, next) => {
  try {
    let config = {
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
      },
    };
    let transporter = nodemailer.createTransport(config);

    await Promise.all(
      req.body.arr.map((ele) => {
        if (ele.status === "Rejected") return;
        return Application.findByIdAndUpdate(ele._id, {
          round:
            ele.round >= ele.driveId.totalRounds ? ele.round : ele.round + 1,
          status: ele.round >= ele.driveId.totalRounds ? "Selected" : "Pending",
        });
      })
    );

    await Promise.all(
      req.body.arr.map((ele) => {
        let content;
        if (ele.status === "Pending" && ele.round < ele.driveId.totalRounds) {
          content = `<h1>Congratulations!!! </h1>${ele.userId.fullName}<br />You have been shortlisted to the next round by <b>${ele.driveId.companyName}</b> for the role of <b>${ele.driveId.jobTitle}</b>`;
        } else if (
          ele.status === "Pending" &&
          ele.round >= ele.driveId.totalRounds
        ) {
          content = `<h1>Congratulations!!! </h1>${ele.userId.fullName}<br />You have been selected for the role of <b>${ele.driveId.jobTitle}<b> in <b>${ele.driveId.companyName}</b>`;
        } else return;

        let message = {
          from: process.env.MAIL,
          to: ele.userId.email,
          subject: "You have been Shortlisted",
          html: content,
        };
        return transporter.sendMail(message);
      })
    );

    return res.status(201).send("Applications shortlisted");
  } catch (error) {
    next(error);
  }
};

const declineApplication = async (req, res, next) => {
  try {
    let config = {
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
      },
    };
    let transporter = nodemailer.createTransport(config);

    await Promise.all(
      req.body.arr.map((ele) => {
        let content;
        if (ele.status === "Pending") {
          content = `<h1>Sorry! </h1>${ele.userId.fullName}<br />You could not make it to the further round in <b>${ele.driveId.companyName}</b> for the role of <b>${ele.driveId.jobTitle}</b>`;
        } else return;

        let message = {
          from: process.env.MAIL,
          to: ele.userId.email,
          subject: `Update from ${ele.driveId.companyName}`,
          html: content,
        };
        return transporter.sendMail(message);
      })
    );

    await Promise.all(
      req.body.arr.map((ele) => {
        return Application.findByIdAndUpdate(ele._id, {
          status: ele.status === "Selected" ? "Selected" : "Rejected",
        });
      })
    );

    return res.status(201).send("Applications not shortlisted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getApplications,
  getPlacedStats,
  getPackageStats,
  getAllApplications,
  createApplication,
  shortlistApplication,
  declineApplication,
};
