const express = require("express");
const { isAuth } = require("../middlewares/Auth");
const {
  createWishlist,
  showaAllWishlist,
  removeWishlistItem,
} = require("../controllers/wishlist.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Wishtlist router is working");
});
//  User Wishlist : http://localhost:6000/api/v1/wishlist/add-wishlist/:productId
router.route("/add-wishlist/:productId").post(isAuth, createWishlist);

//  User Wishlist : http://localhost:6000/api/v1/wishlist/all-wishlist
router.route("/all-wishlist").get(isAuth, showaAllWishlist);

//  User Wishlist : http://localhost:6000/api/v1/wishlist/remove-items/:productId
router.route("/remove-items/:productId").put(isAuth, removeWishlistItem);

module.exports = router;
