const User = require("../models/user.model");
const AsyncHandler = require("../utils/AsyncHandler");
const ErrorHandler = require("../utils/ErrorHandler");

//  register user
exports.registerUser = AsyncHandler(async (req, res, next) => {
  const { name, email, password, phoneNo } = req.body;

  if (!name || !email || !password || !phoneNo) {
    return next(new ErrorHandler(400, "All field is required")); // //check fields are empty or not
  }

  if ([name, email, password, phoneNo].some((field) => field === "")) {
    return next(new ErrorHandler(400, "All field required to register")); // //check fields value are empty or not
  }
  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler(400, "User already exits"));
  }

  user = await User.create({
    name,
    email,
    password,
    phoneNo,
  });

  return res.status(200).json({
    success: true,
    message: "User created successfully",
    user,
  });
});

//  login user
exports.loginUser = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, "All field is required")); // //check fields are empty or not
  }
  if ([email, password].some((field) => field === "")) {
    return next(new ErrorHandler(400, "All field required to register")); //// //check fields value are empty or not
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  let isMatch = await user.matchPassord(password);

  if (isMatch) {
    const token = await user.generateToken();
    console.log(token);
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
      token, //: `Bearer ${token}`,
    });
  } else {
    return next(new ErrorHandler(400, "User credentials fail"));
  }
});

// admin get all user
exports.getAllUsers = AsyncHandler(async (req, res, next) => {
  const users = await User.find({});
  if (!users) {
    return next(new ErrorHandler(400, "No Customer"));
  }

  return res.status(200).json({
    success: true,
    users,
  });
});

// admin get user by id
exports.getSingleUser = AsyncHandler(async (req, res, next) => {
  const { userid } = req.params;
  const user = await User.findById(userid);
  if (!user) {
    return next(new ErrorHandler(400, "User does not exits"));
  }

  return res.status(200).json({
    success: true,
    user,
  });
});