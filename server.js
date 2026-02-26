const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors()); // Frontend bilan bog'lanish uchun
app.use(express.json()); // JSON formatdagi ma'lumotlarni o'qish uchun

// Kelayotgan har bir so'rovni konsolda ko'rish (Xatoni topishga yordam beradi)
app.use((req, res, next) => {
  console.log(`${req.method} so'rovi keldi: ${req.url}`);
  next();
});

// Routerni ulash
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes")); // <-- BU ENDI ISHLAYDI

// MongoDB ulanishi
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB muvaffaqiyatli ulandi"))
  .catch((err) => console.log("MongoDB ulanishida xato:", err));

// Global xato tutuvchi (Agar serverda biron xato bo'lsa, frontend "zaybal" bo'lib qolmaydi)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Serverda xatolik yuz berdi!", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishladi`));
