const Order = require("../models/order.model");
const Product = require("../models/product.model");
const AsyncHandler = require("../utils/AsyncHandler");
const ErrorHandler = require("../utils/ErrorHandler");

// Create new Order
exports.createOrder = AsyncHandler(async (req, res, next) => {
  const {
    shippingAddress,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!req.user) {
    return next(new ErrorHandler(404, "User not found. Please login"));
  }
  if (
    [
      shippingAddress,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    ].some((field) => field === "")
  ) {
    return next(new ErrorHandler(400, "All field is required"));
  }

  const order = await Order.create({
    shippingAddress,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  return res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = AsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myOrders = AsyncHandler(async (req, res) => {
  console.log("this is working");
  if (!req.user) {
    return next(new ErrorHandler(404, "user not found .Please login"));
  }

  const orders = await Order.find({ user: req.user._id });
  return res.json({
    success: true,
    message: "My orders ",
    orders,
  });
});

//  Admin : get all Orders
exports.getAllOrders = AsyncHandler(async (req, res, next) => {
  const orders = await Order.find({});

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = AsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return next(new ErrorHandler(404, "Order not found with this Id"));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler(400, "You have already delivered this order"));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (item) => {
      await updateStock(item.productId, item.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save();
  res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save();
}

// delete Order -- Admin
exports.deleteOrder = AsyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.orderId);

  if (!order) {
    return next(new ErrorHandler(404, "Order not found with this Id"));
  }

  res.status(200).json({
    success: true,
    message: "order deletd successfully",
  });
});
