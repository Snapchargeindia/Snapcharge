const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const loginAttempts = {};

const MAX_ATTEMPTS = 5;
const BLOCK_TIME_MS = 15 * 60 * 1000;

const getClientKey = (req, email = "") =>
  `${req.ip || "unknown"}_${String(email).toLowerCase()}`;

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@snapcharge.com";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Snapcharge@123";
    const ADMIN_JWT_SECRET =
      process.env.ADMIN_JWT_SECRET || "snapcharge_super_secure_admin_key";

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const key = getClientKey(req, email);
    const now = Date.now();
    const attemptData = loginAttempts[key];

    if (attemptData && attemptData.blockUntil && now < attemptData.blockUntil) {
      const mins = Math.ceil((attemptData.blockUntil - now) / 60000);

      return res.status(429).json({
        success: false,
        message: `Too many attempts. Try again in ${mins} minute(s).`,
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedAdminEmail = String(ADMIN_EMAIL).trim().toLowerCase();

    if (normalizedEmail !== normalizedAdminEmail || password !== ADMIN_PASSWORD) {
      if (!loginAttempts[key]) {
        loginAttempts[key] = {
          count: 0,
          blockUntil: null,
        };
      }

      loginAttempts[key].count += 1;

      if (loginAttempts[key].count >= MAX_ATTEMPTS) {
        loginAttempts[key].blockUntil = now + BLOCK_TIME_MS;
        loginAttempts[key].count = 0;
      }

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    delete loginAttempts[key];

    const token = jwt.sign(
      { email: ADMIN_EMAIL, role: "admin" },
      ADMIN_JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        email: ADMIN_EMAIL,
      },
    });
  } catch (error) {
    console.log("ADMIN LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
});

module.exports = router;