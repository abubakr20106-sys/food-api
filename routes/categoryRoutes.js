// routes/categoryRoutes.js faylini tekshiring va yangilang:

const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.post("/", createCategory);
router.delete("/:id", deleteCategory); // SHU QATORNI QO'SHING

module.exports = router;
