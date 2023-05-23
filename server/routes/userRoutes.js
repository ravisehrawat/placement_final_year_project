const express = require("express");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get(
  "/get-user/:id/:user",
  auth.verifyCoordinator,
  userController.getUser
);

userRouter.get(
  "/get-users/:id",
  auth.verifyIncharge,
  userController.getAllUsers
);

userRouter.post("/login", userController.login);

userRouter.post("/register", userController.register);

userRouter.post(
  "/send-message/:id",
  auth.verifyUser,
  userController.sendMessage
);

userRouter.put(
  "/update-profile/:id",
  auth.verifyUser,
  userController.updateProfile
);

userRouter.put(
  "/make-coordinator/:id",
  auth.verifyIncharge,
  userController.makeCoordinator
);

module.exports = userRouter;
