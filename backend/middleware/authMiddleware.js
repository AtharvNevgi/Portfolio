// // import jwt from "jsonwebtoken";
// const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET

// const protect = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token)
//     return res.status(401).json({ message: "Not authorized, token missing" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.admin = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// module.exports = {protect};
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ VERY IMPORTANT
    req.user = await Admin.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protect };