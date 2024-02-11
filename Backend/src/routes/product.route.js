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
  createProductReview,
  deleteReview,
  getProductReviews,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("product route is working");
});

// Admin create product : http://localhost:8000/api/v1/product/admin/create-product
router
  .route("/admin/create-product")
  .post(isAuth, isAdmin, upload.single("image"), createProduct);

// Admin show all products  : http://localhost:8000/api/v1/product/all-products
router.route("/all-products").get(getAllProduct);

//  get product deatail : http://localhost:8000/api/v1/product/:productId
router.route("/:productId").get(getProductDeatails);

//  get product deatail : http://localhost:8000/api/v1/product/admin/products
router.route("/admin/products").get(isAuth, isAdmin, getAdminProducts);

//  Admin Delete and Update product : http://localhost:8000/api/v1/product/admin/product/productId
router
  .route("/admin/product/:productId")
  .put(isAuth, isAdmin, upload.single("image"), updateProduct)
  .delete(isAuth, isAdmin, deleteProduct);

//   user Reviews  product : http://localhost:8000/api/v1/product/review
router.route("/review").put(isAuth, createProductReview);

//   user Reviews  product : http://localhost:8000/api/v1/product/reviews/:productId
router.route("/reviews/:productId").get(getProductReviews);

//   user delete Review of  product : http://localhost:8000/api/v1/product/reviews/:productId/:reviewId
router.route("/reviews/:productId/:reviewId").delete(isAuth, deleteReview);

module.exports = router;
