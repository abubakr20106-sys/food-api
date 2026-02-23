// controllers/categoryController.js fayliga qo'shing:

const Category = require("../models/Category");
const Product = require("../models/Product"); // Mahsulotlarni ham tekshirish uchun

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Kategoriyani topish va o'chirish
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Kategoriya topilmadi" });
    }

    // 2. Ixtiyoriy: Shu kategoriyaga tegishli mahsulotlarni ham o'chirish
    // (Frontend kodingizda shuni kutayotgan ekan)
    await Product.deleteMany({ category: id });

    res.json({ message: "Kategoriya va unga tegishli mahsulotlar o'chirildi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Serverda xatolik yuz berdi", error: error.message });
  }
};
