const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET COLLECTIONS
router.get("/", async (req, res) => {
  try {
    const collections = await Product.distinct("category");

    const formatted = collections.map((c) => ({
      id: c,
      title: c,
    }));

    res.json({
      data: {
        collections: formatted,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;