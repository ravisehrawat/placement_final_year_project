const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minLength: 5,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    coordinator: {
      type: Boolean,
      default: false,
    },
    incharge: {
      type: Boolean,
      default: false,
    },
    phoneNo: {
      type: Number,
      required: true,
      minLength: 10,
    },
    registrationNumber: {
      type: Number,
      required: true,
      unique: true,
      minLength: 10,
    },
    gender: {
      type: String,
    },
    cgpa: {
      type: String,
    },
    backlogs: {
      type: String,
    },
    pic: {
      type: String,
      default: "",
    },
    branch: {
      type: String,
    },
    address: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    experience: [
      {
        companyName: String,
        jobRole: String,
        description: String,
        from: String,
        to: String,
      },
    ],
    education: [
      {
        name: String,
        course: String,
        description: String,
        from: String,
        to: String,
      },
    ],
    skills: [
      {
        type: String,
      },
    ],
    hobbies: {
      type: String,
    },

    projects: [
      {
        projectName: String,
        link: String,
        description: String,
        from: String,
        to: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", schema);

module.exports = User;
