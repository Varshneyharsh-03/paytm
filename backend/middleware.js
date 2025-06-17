const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({
      msg: "token does not exists",
    });
  }

  const token = authHeader.spilt(" ")[1];

  try {
  } catch (error) {}
};
