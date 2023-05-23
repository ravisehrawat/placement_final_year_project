const express = require("express");
const auth = require("../middleware/auth");
const driveController = require("../controllers/driveController");
const driveRouter = express.Router();

driveRouter.get(
  "/get-drive/:id/:jobid",
  auth.verifyUser,
  driveController.getDrive
);

driveRouter.get(
  "/get-drives/:id",
  auth.verifyUser,
  driveController.getAllDrives
);

driveRouter.post(
  "/add-drive/:id",
  auth.verifyCoordinator,
  driveController.addDrive
);

driveRouter.post(
  "/send-message/:id",
  auth.verifyUser,
  driveController.sendMessage
);

module.exports = driveRouter;
