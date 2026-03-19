const express  = require("express");
const mongoose = require("mongoose");
const dotenv   = require("dotenv");
const cors     = require("cors");

dotenv.config();

const app = express();

// ─────────────────────────────────────────────────────────────
// CORS — allows Vite (5173) + CRA (3000) + production
// ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    process.env.CLIENT_URL,
  ].filter(Boolean),
  methods      : ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials  : true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────────────────────
// MONGODB
// ─────────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI, { autoIndex: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err.message));

// ─────────────────────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────────────────────
app.use("/api/products",   require("./routes/productRoutes"));
app.use("/api/auth",       require("./routes/authRoutes"));
app.use("/api/user",       require("./routes/userRoutes"));
app.use("/api/payment",    require("./routes/paymentRoutes"));
app.use("/api/orders",     require("./routes/orderRoutes"));
app.use("/api/shiprocket", require("./routes/shiprocketRoutes"));

// ─────────────────────────────────────────────────────────────
// 404
// ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ─────────────────────────────────────────────────────────────
// START
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));