const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/Auth");
const {
  createOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  myOrders,
} = require("../controllers/order.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Order route is working");
});

// user create order : http://localhost:8000/api/v1/order/new
router.route("/new").post(isAuth, createOrder);

// user orders : http://localhost:8000/api/v1/order/myorder
router.route("/myorder").get(isAuth, myOrders);

//   user show order detail : http://localhost:8000/api/v1/order/:orderId
router.route("/:orderId").get(isAuth, getSingleOrder);

// Admin show all orders of all  user : http://localhost:8000/api/v1/order/admin/orders
router.route("/admin/orders").get(isAuth, isAdmin, getAllOrders);

// Admin  Update Orders : http://localhost:8000/api/v1/order/admin/:orderId
router
  .route("/admin/:orderId")
  .patch(isAuth, isAdmin, updateOrder)
  .delete(isAuth, isAdmin, deleteOrder);

module.exports = router;

/*
Cast to ObjectId failed for value \"myorders\" at path \"_id\" for model \"Order\"", 
the solution of this problem is the order of routes  

router.route('/myorder').get(protect, getMyOrders)  right order
router.route('/:id').get(protect, getOrderById) 
--- wrong order of route
router.route('/:id').get(protect, getOrderById)
router.route('/myorder').get(protect, getMyOrders)  

*/
