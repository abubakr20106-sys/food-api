const Product = require("../models/Product");

// Barcha mahsulotlarni olish
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ma'lumotlarni yuklashda xato", error: error.message });
  }
};

// Mahsulot yaratish
exports.createProduct = async (req, res) => {
  try {
    // req.body ichidagi price raqam ekanligiga ishonch hosil qiling
    const product = new Product(req.body);
    await product.save();

    // Yaratilgan mahsulotni kategoryasi bilan qaytarish (frontendda muammo bo'lmasligi uchun)
    const populatedProduct = await Product.findById(product._id).populate(
      "category",
    );
    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Qo'shishda xato", error: error.message });
  }
};

// Mahsulotni tahrirlash (UPDATE)
exports.updateProduct = async (req, res) => {
  try {
    // Tahrirlashda ID borligini tekshirish
    if (!req.params.id) {
      return res.status(400).json({ message: "ID ko'rsatilmadi" });
    }

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
    console.error("Update xatosi:", error);
    res
      .status(400)
      .json({ message: "Tahrirlashda xato yuz berdi", error: error.message });
  }
};

// Mahsulotni o'chirish
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "O'chiriladigan mahsulot topilmadi" });
    }
    res.json({ message: "Mahsulot muvaffaqiyatli o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: "O'chirishda xato", error: error.message });
  }
};
