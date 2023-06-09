const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).send("You are not authorized to access");
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user.userDetails._id;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (
      req.params.id === req.user.id ||
      req.user.coordinator ||
      req.user.incharge
    ) {
      next();
    } else {
      return res.status(403).send("You are not authorized to access");
    }
  });
};

const verifyCoordinator = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.coordinator || req.user.incharge) {
      next();
    } else {
      return res.status(403).send("You are not authorized to access");
    }
  });
};

const verifyIncharge = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.incharge) {
      next();
    } else {
      return res.status(403).send("You are not authorized to access");
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyCoordinator, verifyIncharge };
