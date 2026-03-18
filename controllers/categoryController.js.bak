const Category = require("../models/Category");
const Product = require("../models/Product");

const getCategories = async (req, res) => {
  try {
    const cats = await Category.find();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const newCat = new Category({ name: req.body.name });
    await newCat.save();
    res.status(201).json(newCat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Category.findByIdAndUpdate(
      id,
      { name: req.body.name },
      { new: true },
    );
    if (!updated) {
      return res.status(404).json({ message: "Kategoriya topilmadi" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Kategoriya topilmadi" });
    }
    await Product.deleteMany({ category: id });
    res.json({ message: "O'chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
