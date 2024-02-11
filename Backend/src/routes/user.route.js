const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  userProfile,
  UpdatePaasword,
  UpdateProfile,
} = require("../controllers/user.controller");
const { isAuth, isAdmin } = require("../middlewares/Auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("user route working  successfully");
});
//  Register User ; http://localhost:8000/api/v1/user/register
router.route("/register").post(registerUser);

//  Login User : http://localhost:8000/api/v1/user/login
router.route("/login").post(loginUser);

//  Login User : http://localhost:8000/api/v1/user/profile
router.route("/profile").get(isAuth, userProfile);

//  Login User : http://localhost:8000/api/v1/user/change-password
router.route("/change-password").put(isAuth, UpdatePaasword);

//  Login User : http://localhost:8000/api/v1/user/update-profile
router.route("/update-profile").put(isAuth, UpdateProfile);

//  Asmin get all User : http://localhost:8000/api/v1/user/admin/users
router.route("/admin/users").get(isAuth, isAdmin, getAllUsers);

//  Admin get single User : http://localhost:8000/api/v1/user/admin/userid
router.route("/admin/:userid").get(isAuth, isAdmin, getSingleUser);

module.exports = router;
