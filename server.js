const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routerni ulash
app.use("/api/categories", require("./routes/categoryRoutes"));
// app.use("/api/products", require("./routes/productRoutes"));

// MongoDB ulanishi
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB ulandi"))
  .catch((err) => console.log("Xato:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`${PORT}-portda ishladi`));
