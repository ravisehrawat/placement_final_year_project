const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/conn");
const userRouter = require("./routes/userRoutes");
const driveRouter = require("./routes/driveRoutes");
const applicationRouter = require("./routes/applicationRoutes");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/drive", driveRouter);
app.use("/api/application", applicationRouter);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong";

  return res.status(errStatus).send({
    success: false,
    stack: err.stack,
    message: errMsg,
    status: errStatus,
  });
});

app.listen(port, () => {
  console.log("Server connected");
});
