const Cart = require("../models/cart.model");
const AsyncHandler = require("../utils/AsyncHandler");
const ErrorHandler = require("../utils/ErrorHandler");

exports.AddToCart = AsyncHandler(async (req, res, next) => {
  const { productId } = req.body;

  if (!req.user) {
    return next(new ErrorHandler(404, "user not found Please login"));
  }
  if (!productId && productId === "") {
    return next(new ErrorHandler(400, "Product is required to procced"));
  }

  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = new Cart({ userId: req.user._id, items: [{ productId }] });
  } else {
    const existingCartItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );
    console.log("exititem", existingCartItem);

    if (existingCartItem) {
      return next(new ErrorHandler(400, "Product is already in cart"));
    } else {
      // If the product is not in the cart, add it
      cart.items.push(productId);
    }
  }
  await cart.save();

  return res.status(200).json({
    success: true,
    message: "Item added into cart Successfully",
    cart,
  });
});

//get all cart item by user id
exports.getCartByUserId = AsyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler(404, "user not found Please login"));
  }

  const carts = await Cart.findOne({ userId: req.user._id }).populate(
    "items.productId"
  );

  if (!carts) {
    return next(new ErrorHandler(404, "User does have any cart item"));
  }

  return res.status(200).json({
    success: true,
    carts,
  });
});

// update cart Items
exports.updateCartItem = AsyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  if (!req.user) {
    return next(new ErrorHandler(404, "user not found Please login"));
  }
  if (!productId && productId === "") {
    return next(new ErrorHandler(400, "Product is required to procced"));
  }

  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    return next(new ErrorHandler(404, "User cart is empty"));
  }

  const exitngCartItem = cart.items.find((item) =>
    item.productId.equals(productId)
  );

  if (!exitngCartItem) {
    return next(new ErrorHandler(404, "Item does not exit in cart"));
  }
  exitngCartItem.quantity = quantity;

  await cart.save();
  return res.status(200).json({
    success: true,
    message: "Cart item update Successfully",
    cart,
  });
});

// update cart Items
exports.deleteCartItem = AsyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    return next(new ErrorHandler(404, "User cart is empty"));
  }

  cart.items = cart.items.filter((item) => !item.productId.equals(productId));

  await cart.save();
  return res.status(200).json({
    success: true,
    message: "Cart item delete Successfully",
  });
});
