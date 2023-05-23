const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    driveId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drive",
    },
    round: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", schema);

module.exports = Application;
