const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// TEMP SEED ROUTE - custom route always above /:id
router.get("/seed/add-sample-products", async (req, res) => {
  try {
    await Product.deleteMany({});

    const sampleProducts = [
      {
        name: "Premium Cover Black",
        category: "Covers",
        subcategory: "Premium Covers",
        description: "Premium protective cover with elegant finish.",
        price: 1299,
        mrp: 1999,
        stock: 20,
        images: [
          "https://via.placeholder.com/500x500.png?text=Premium+Cover+1",
        ],
        variants: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15"],
        specs: ["Premium material", "Shock protection", "Slim design"],
        isFeatured: true,
      },
      {
        name: "Tech Woven Case",
        category: "Covers",
        subcategory: "Tech Woven",
        description: "Woven magsafe case with premium texture.",
        price: 1999,
        mrp: 4900,
        stock: 15,
        images: [
          "https://via.placeholder.com/500x500.png?text=Tech+Woven",
        ],
        variants: ["iPhone 17 Pro Max", "iPhone 17 Pro"],
        specs: ["MagSafe support", "Premium woven finish", "Raised edges"],
        isFeatured: true,
      },
      {
        name: "Watch Strap Leather",
        category: "Watch",
        subcategory: "Watch Straps",
        description: "Comfortable watch strap for daily wear.",
        price: 799,
        mrp: 1299,
        stock: 30,
        images: [
          "https://via.placeholder.com/500x500.png?text=Watch+Strap",
        ],
        variants: ["38mm / 40mm / 41mm", "42mm / 44mm / 45mm"],
        specs: ["Soft finish", "Easy fit", "Durable build"],
        isFeatured: false,
      },
      {
        name: "Power Bank 10000mAh",
        category: "Charging",
        subcategory: "Power Bank",
        description: "Fast charging power bank with compact body.",
        price: 1499,
        mrp: 2199,
        stock: 25,
        images: [
          "https://via.placeholder.com/500x500.png?text=Power+Bank",
        ],
        variants: ["10000mAh", "20000mAh", "Wireless"],
        specs: ["Fast charging", "Portable", "Battery indicator"],
        isFeatured: true,
      },
    ];

    const inserted = await Product.insertMany(sampleProducts);

    res.status(201).json({
      message: "Sample products added successfully",
      count: inserted.length,
      products: inserted,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to seed products",
      error: error.message,
    });
  }
});

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;