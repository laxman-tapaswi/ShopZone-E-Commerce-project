const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getSingleUser,
} = require("../controllers/user.controller");
const { isAuth, isAdmin } = require("../middlewares/Auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "user route working  successfully",
  });
});
//  Register User ; http://localhost:6000/api/v1/user/register
router.route("/register").post(registerUser);

//  Login User : http://localhost:6000/api/v1/user/login
router.route("/login").post(loginUser);

//  Login User : http://localhost:6000/api/v1/user/admin/users
router.route("/admin/users").get(isAuth, isAdmin, getAllUsers);

//  Login User : http://localhost:6000/api/v1/user/admin/users
router.route("/admin/:userid").get(isAuth, isAdmin, getSingleUser);

module.exports = router;
