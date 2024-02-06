const express = require("express");

const upload = require("../middlewares/multer");
const { isAuth, isAdmin } = require("../middlewares/Auth");
const {
  createProduct,
  getAllProduct,
  getProductDeatails,
  getAdminProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("product route is working");
});

// Admin create product : http://localhost:6000/api/v1/product/admin/create-product
router
  .route("/admin/create-product")
  .post(isAuth, isAdmin, upload.single("image"), createProduct);

// Admin show all products  : http://localhost:6000/api/v1/product/all-products
router.route("/all-products").get(getAllProduct);

//  get product deatail : http://localhost:6000/api/v1/product/:productId
router.route("/:productId").get(getProductDeatails);

//  get product deatail : http://localhost:6000/api/v1/product/:productId
router.route("/admin/products").get(isAuth, isAdmin, getAdminProducts);

//  Admin Delete and Update product : http://localhost:6000/api/v1/product/admin/product/productId
router
  .route("/admin/product/:productId")
  .put(isAuth, isAdmin, updateProduct)
  .delete(isAuth, isAdmin, deleteProduct);

module.exports = router;

// router.route("/review").put(isAuthenticatedUser, createProductReview);

// router
//   .route("/reviews")
//   .get(getProductReviews)
//   .delete(isAuthenticatedUser, deleteReview);
