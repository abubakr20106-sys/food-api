const Category = require("../models/Category");
const Product = require("../models/Product");

// 1. Kategoriyalarni olish
const getCategories = async (req, res) => {
  try {
    const cats = await Category.find();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Kategoriya yaratish (routerda createCategory deb nomlangan)
const createCategory = async (req, res) => {
  try {
    const newCat = new Category({ name: req.body.name });
    await newCat.save();
    res.status(201).json(newCat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 3. Kategoriyani o'chirish
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Kategoriya topilmadi" });
    }

    // Shu kategoriyaga tegishli mahsulotlarni ham o'chirib tashlaymiz
    await Product.deleteMany({ category: id });

    res.json({ message: "Kategoriya va unga tegishli mahsulotlar o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EKSPORT (Eng muhim joyi - ismlar routerdagiga mos bo'lsin)
module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};
