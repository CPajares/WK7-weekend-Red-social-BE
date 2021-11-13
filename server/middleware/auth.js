const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error = new Error("Not authorised, missing token");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];

    if (!token) {
      const error = new Error("Not authorised, missing token");
      error.code = 401;
      next(error);
    } else {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = user.userId;
        next();
      } catch {
        const error = new Error("Not authorized!");
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = auth;