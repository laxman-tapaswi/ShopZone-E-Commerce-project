const express = require("express");
const { isAuth } = require("../middlewares/Auth");
const {
  AddToCart,
  getCartByUserId,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Cart route is working");
});

// Add To user Cart : http://localhost:8000/api/v1/cart/add-to-cart/:productId
router.route("/add-to-cart/:productId").post(isAuth, AddToCart);

// Get User Cart by UserId : http://localhost:8000/api/v1/cart/user-cart
router.route("/user-cart").get(isAuth, getCartByUserId);

// Update User Cart : http://localhost:8000/api/v1/cart/update-cart/:productId
router.route("/update-cart/:productId").patch(isAuth, updateCartItem);

// delete User Cart : http://localhost:8000/api/v1/cart/delete-cart/:productId
router.route("/delete-cart/:productId").delete(isAuth, deleteCartItem);

module.exports = router;
