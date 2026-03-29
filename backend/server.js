// app.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const adminAuthMiddleware = require("./middleware/adminAuthMiddleware");

dotenv.config();

const app = express();

/* ================= CORS ================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://snapchargee.in",
  "https://www.snapchargee.in",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith(".amplifyapp.com") ||
        origin.endsWith(".vercel.app");
      if (isAllowed) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => res.send("Snapcharge API running"));
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI, { autoIndex: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err.message));

/* ================= ROUTES ================= */
app.use("/api/products",    require("./routes/productRoutes"));
app.use("/api/auth",        require("./routes/authRoutes"));
app.use("/api/user",        require("./routes/userRoutes"));
app.use("/api/payment",     require("./routes/paymentRoutes"));
app.use("/api/orders",      require("./routes/orderRoutes"));
app.use("/api/track-order", require("./routes/trackOrderRoutes"));
app.use("/api/admin-auth",  require("./routes/adminAuthRoutes"));
app.use("/api/shiprocket",  require("./routes/shiprocketRoutes")); // ✅ Shiprocket routes
app.use("/api/catalog",     require("./routes/catalogRoutes"));

app.use(
  "/api/admin",
  adminAuthMiddleware,
  require("./routes/adminRoutes")
);

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);