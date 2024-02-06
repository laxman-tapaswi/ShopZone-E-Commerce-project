const Product = require("../models/product.model");
const AsyncHandler = require("../utils/AsyncHandler");
const ErrorHandler = require("../utils/ErrorHandler");

//  Admin create Product
exports.createProduct = AsyncHandler(async (req, res, next) => {
  const { name, stock, price, category, brand } = req.body;
  const image = req.file;

  if ([name, stock, price, category, brand].some((field) => field === "")) {
    fs.unlinkSync(image.path);
    return next(new ErrorHandler(400, "All field is required"));
  }

  // let product = await Product.findOne({ name });
  // if (product) {
  //   fs.unlinkSync(image.path);
  //   return next(new ErrorHandler(400, "Product name can not be same"));
  // }

  const product = await Product.create({
    name,
    stock,
    price,
    category,
    brand,
    image: image?.path,
  });

  return res.status(200).json({
    success: true,
    message: "product created successfully",
    product,
  });
});

//  get all products
exports.getAllProduct = AsyncHandler(async (req, res, next) => {
  const { search, category, price, sort } = req.query;

  const limit = process.env.LIMIT_PER_PAGE;

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

  console.log(baseQuery);
  const products = await Product.find(baseQuery)
    .sort(sort ? { price: sort === "asc" ? 1 : -1 } : undefined)
    .limit(limit);

  return res.status(200).json({
    success: true,
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

// Get All Product (Admin)
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
