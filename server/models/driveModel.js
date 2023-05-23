const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyOverview: {
      type: String,
      required: true,
      minLength: 10,
    },
    tags: {
      type: [String],
    },
    jobDesc: {
      type: String,
      required: true,
      minLength: 10,
    },
    website: {
      type: String,
    },
    gender: {
      type: String,
      default: "all",
    },
    tierNumber: {
      type: String,
      required: true,
    },
    vacancy: {
      type: Number,
      default: 1,
    },
    bond: {
      type: Number,
      default: 0,
    },
    totalRounds: {
      type: Number,
      default: 1,
    },
    backlogs: {
      type: Number,
      default: 0,
    },
    pic: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "anywhere",
    },
    jobType: {
      type: String,
      default: "full time",
    },
    minCGPA: {
      type: String,
      required: true,
    },
    lastDate: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    branches: {
      type: String,
      default: "all",
    },
  },
  {
    timestamps: true,
  }
);

const Drive = mongoose.model("Drive", schema);

module.exports = Drive;
