const express = require("express");
const router  = express.Router();
const Product = require("../models/Product");

// ─────────────────────────────────────────────
// HELPER: Format product for Shiprocket
// ─────────────────────────────────────────────
const formatProduct = (p) => ({
  id         : parseInt(p._id.toString().slice(-8), 16),
  name       : p.name,
  description: p.description || "",
  image      : p.images?.[0] || "",
  price      : p.price,
  mrp        : p.mrp || p.price,
  category   : p.category || "",
  variants   : (p.variants || []).map((v, i) => ({
    id     : parseInt(p._id.toString().slice(-6), 16) + i,
    name   : v,
    price  : p.price,
    mrp    : p.mrp || p.price,
    sku    : `${p._id}-${i}`,
    stock  : p.stock || 100,
    image  : p.images?.[0] || "",
    weight : 0.5,
    length : 10,
    breadth: 10,
    height : 5,
  })),
});

// ─────────────────────────────────────────────
// API 1: Fetch All Products
// GET /api/catalog/products?page=1&limit=100
// ─────────────────────────────────────────────
router.get("/products", async (req, res) => {
  const page  = parseInt(req.query.page)  || 1;
  const limit = parseInt(req.query.limit) || 100;
  const skip  = (page - 1) * limit;

  try {
    const [products, total] = await Promise.all([
      Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(),
    ]);

    return res.status(200).json({
      products: products.map(formatProduct),
      page,
      limit,
      total,
    });

  } catch (err) {
    console.error("[Catalog] /products error:", err.message);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ─────────────────────────────────────────────
// API 2: Fetch Collections (Categories)
// GET /api/catalog/collections?page=1&limit=100
// ─────────────────────────────────────────────
router.get("/collections", async (req, res) => {
  const page  = parseInt(req.query.page)  || 1;
  const limit = parseInt(req.query.limit) || 100;

  try {
    const categories = await Product.distinct("category");

    return res.status(200).json({
      collections: categories.map((cat, i) => ({
        id  : i + 1,
        name: cat,
      })),
      page,
      limit,
      total: categories.length,
    });

  } catch (err) {
    console.error("[Catalog] /collections error:", err.message);
    return res.status(500).json({ error: "Failed to fetch collections" });
  }
});

// ─────────────────────────────────────────────
// API 3: Fetch Products by Collection
// GET /api/catalog/collections/:name/products
// ─────────────────────────────────────────────
router.get("/collections/:name/products", async (req, res) => {
  const { name } = req.params;
  const page     = parseInt(req.query.page)  || 1;
  const limit    = parseInt(req.query.limit) || 100;
  const skip     = (page - 1) * limit;

  try {
    const [products, total] = await Promise.all([
      Product.find({ category: name }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments({ category: name }),
    ]);

    return res.status(200).json({
      products: products.map(formatProduct),
      page,
      limit,
      total,
    });

  } catch (err) {
    console.error("[Catalog] /collections/:name error:", err.message);
    return res.status(500).json({ error: "Failed to fetch products by collection" });
  }
});

module.exports = router;