const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error:", err.message));

// test route
app.get("/", (req, res) => {
  res.send("API running");
});

// product routes
app.use("/api/products", require("./routes/productRoutes"));

// payment routes
app.use("/api/payment", require("./routes/paymentRoutes"));

// ✅ ORDERS ROUTE (NEW)
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/track-order", require("./routes/trackOrderRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});