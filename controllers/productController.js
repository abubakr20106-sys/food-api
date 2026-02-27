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

// Mahsulotni tahrirlash
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    ).populate("category");

    if (!updated) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Mahsulot o'chirildi" });
};
