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
  "https://snapcharge.vercel.app",
  "https://snapcharge.in",
  "https://www.snapcharge.in",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

/* ================= MIDDLEWARE ================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.send("Snapcharge API running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ================= MONGODB ================= */

mongoose
  .connect(process.env.MONGO_URI, {
    autoIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
    process.exit(1);
  });

/* ================= ROUTES ================= */

app.use("/api/products", require("./routes/productRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/payment", require("./routes/paymentRoutes"));

app.use("/api/orders", require("./routes/orderRoutes"));

app.use("/api/track-order", require("./routes/trackOrderRoutes"));

app.use("/api/admin-auth", require("./routes/adminAuthRoutes"));

app.use(
  "/api/admin",
  adminAuthMiddleware,
  require("./routes/adminRoutes")
);

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});