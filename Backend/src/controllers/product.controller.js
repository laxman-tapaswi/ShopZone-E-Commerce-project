const { query } = require("express");
const Product = require("../models/product.model");
const AsyncHandler = require("../utils/AsyncHandler");
const ErrorHandler = require("../utils/ErrorHandler");

//  Admin create Product
exports.createProduct = AsyncHandler(async (req, res, next) => {
  const { name, stock, price, category, brand, description } = req.body;
  const image = req.file;
  // console.log(image);
  if (
    [name, stock, price, category, brand, description].some(
      (field) => field === ""
    )
  ) {
    fs.unlinkSync(image.path);
    return next(new ErrorHandler(400, "All field is required"));
  }

  const product = await Product.create({
    name,
    stock,
    price,
    category,
    brand,
    image: image?.path,
    description,
    user: req.user._id,
  });

  return res.status(200).json({
    success: true,
    message: "product created successfully",
    product,
  });
});

//  get all products
exports.getAllProduct = AsyncHandler(async (req, res, next) => {
  const { search, category, price, sort, brand, page } = req.query;
  const currPage = page || 1;
  const limit = process.env.LIMIT_PER_PAGE;
  const skip = (currPage - 1) * limit;

  const baseQuery = {};
  if (search) {
    baseQuery.name = { $regex: search, $options: "i" };
  }
  if (price) {
    baseQuery.price = { $lte: Number(price) };
  }
  if (category) {
    baseQuery.category = category;
  }
  if (brand) {
    baseQuery.brand = brand;
  }

  console.log(baseQuery);
  const products = await Product.find(baseQuery)
    .sort(sort ? { price: sort === "asc" ? 1 : -1 } : undefined)
    .limit(limit)
    .skip(skip);

  return res.status(200).json({
    success: true,
    total: products.length,
    products,
  });
});

// get  product Details by id
exports.getProductDeatails = AsyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found "));
  }

  return res.status(200).json({
    success: true,
    product,
  });
});

//  Admin  : Get All Product
exports.getAdminProducts = AsyncHandler(async (req, res, next) => {
  const products = await Product.find();

  if (!products) {
    return next(new ErrorHandler(404, "Product not found "));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

// Admin :   update product datails
exports.updateProduct = AsyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const image = req.file;
  if (image) {
    req.body.image = image.path;
  }
  const product = await Product.findByIdAndUpdate(
    productId,
    { ...req.body },
    { new: true }
  );
  if (!product) {
    return next(new ErrorHandler(404, "Product not found "));
  }

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

// Admin :   delete Product
exports.deleteProduct = AsyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  return res.status(200).json({
    success: true,
    message: "Product deleted Successfully",
  });
});

//  create reviews
exports.createProductReview = AsyncHandler(async (req, res, next) => {
  const { productId, comment, rating } = req.body;
  if (!req.user) {
    return next(new ErrorHandler(404, "user not found Please login"));
  }
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  const isReviewed = product.reviews.find((review) =>
    review.user.equals(req.user._id)
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.equals(req.user._id)) {
        review.rating = rating;
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.NoOfReviews = product.reviews.length;
  }

  let totalRating = 0;
  product.reviews.forEach((rev) => {
    totalRating += rev.rating;
  });

  product.ratings = totalRating / product.reviews.length;
  await product.save();

  return res.status(201).json({
    success: true,
    product,
  });
});

//  get   product review
exports.getProductReviews = AsyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  console.log(productId);
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }
  return res.status(201).json({
    success: true,
    product,
  });
});

//  get all reviews of product
exports.deleteReview = AsyncHandler(async (req, res, next) => {
  const { productId, reviewId } = req.params;
  console.log(reviewId);
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  product.reviews = product.reviews.filter(
    (review) => !review._id.equals(reviewId)
  );

  let totalRating = 0;
  if (product.ratings.length > 0) {
    product.reviews.forEach((rev) => {
      totalRating += rev.rating;
    });

    product.ratings = totalRating / product.reviews.length;

    product.NoOfReviews = product.reviews.length;
  } else {
    product.ratings = 0;
    product.NoOfReviews = 0;
  }

  // const newProduct = await Product.findByIdAndUpdate(
  //   productId,
  //   { ratings, NoOfReviews, reviews },
  //   { new: true }
  // );
  await product.save();

  return res.status(201).json({
    success: true,
    product,
  });
});
