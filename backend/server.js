const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const adminAuthMiddleware = require("./middleware/adminAuthMiddleware");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error:", err.message));

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/track-order", require("./routes/trackOrderRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/my-orders", require("./routes/myOrdersRoutes"));

app.use("/api/admin-auth", require("./routes/adminAuthRoutes"));
app.use("/api/admin", adminAuthMiddleware, require("./routes/adminRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});