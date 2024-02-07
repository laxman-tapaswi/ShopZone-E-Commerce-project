const Wishlist = require("../models/wishlist.model");
const AsyncHandler = require("../utils/AsyncHandler");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createWishlist = AsyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  if (!req.user) {
    return next(new ErrorHandler(404, "User not found Please login"));
  }
  let wishlist = await Wishlist.findOne({ userId: req.user._id });

  if (wishlist) {
    if (wishlist.items.includes(productId)) {
      return next(new ErrorHandler(400, "Product already in wishlist"));
    } else {
      wishlist.items.push(productId);
      await wishlist.save();
    }
  } else {
    wishlist = await Wishlist.create({
      userId: req.user._id,
      items: [productId],
    });
  }

  return res.status(200).json({
    success: true,
    message: "wishlist create successfully",
    wishlist,
  });
});

exports.showaAllWishlist = AsyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler(400, "User not found Please login"));
  }
  const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate(
    "items"
  );
  if (!wishlist)
    return next(new ErrorHandler(404, "User Wishlist is not found"));

  return res.status(200).json({
    success: true,
    message: "User Wishlist found successfully",
    wishlist,
  });
});

exports.removeWishlistItem = AsyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  if (!req.user) {
    return next(new ErrorHandler(400, "User not found Please login"));
  }

  let wishlist = await Wishlist.findOne({ userId: req.user._id });

  if (wishlist) {
    if (wishlist.items.includes(productId)) {
      wishlist.items = wishlist.items.filter((item) => !item.equals(productId));
      await wishlist.save();
    } else {
      return next(new ErrorHandler(400, "Product not User wishlist"));
    }
  } else {
    return next(new ErrorHandler(400, "User Wishlist is not found"));
  }

  return res.status(200).json({
    success: true,
    message: " Product remove from wishlist successfully",
  });
});
