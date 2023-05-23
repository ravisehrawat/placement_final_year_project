const express = require("express");
const auth = require("../middleware/auth");
const applicationController = require("../controllers/applicationController");
const applicationRouter = express.Router();

applicationRouter.get(
  "/get-application/:id",
  auth.verifyUser,
  applicationController.getApplications
);

applicationRouter.get(
  "/placed-stats/:id",
  auth.verifyUser,
  applicationController.getPlacedStats
);

applicationRouter.get(
  "/package-stats/:id",
  auth.verifyUser,
  applicationController.getPackageStats
);

applicationRouter.get(
  "/get-applications/:id",
  auth.verifyCoordinator,
  applicationController.getAllApplications
);

applicationRouter.post(
  "/create-application/:id",
  auth.verifyUser,
  applicationController.createApplication
);

applicationRouter.post(
  "/shortlist-application/:id",
  auth.verifyCoordinator,
  applicationController.shortlistApplication
);

applicationRouter.post(
  "/decline-application/:id",
  auth.verifyCoordinator,
  applicationController.declineApplication
);

module.exports = applicationRouter;
