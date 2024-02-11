const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.isAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.json({ message: "token expire" });

    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    if (!decoded) return res.json({ message: "invalid token" });

    const user = await User.findById(decoded._id);

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "You are Unauthorized",
      error,
    });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    return res.status(400).json({
      success: false,
      message: "Unauthorized only for Admin",
    });
  }
};
