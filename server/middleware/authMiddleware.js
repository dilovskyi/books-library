require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "User is not logged in" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.reader = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Something went wrong" });
  }
};
