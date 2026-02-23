const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate("category");
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Mahsulot o'chirildi" });
};
    