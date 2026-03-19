const axios = require("axios");

// ✅ Global token
let token = null;

// ✅ Your Shiprocket API Keys
const SHIPROCKET_API_KEY = "zeYGVyDtCczihjDC"; // ← tumhara API Key
const SHIPROCKET_API_SECRET = "PvcBuIxKLaaacHvmNEi34mFchjisYGn5"; // ← tumhara Secret Key

// Generate Shiprocket token
const generateToken = async () => {
  try {
    const res = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: SHIPROCKET_API_KEY,
        password: SHIPROCKET_API_SECRET
      }
    );

    token = res.data.token;
    console.log("Token Generated ✅");
    return token;
  } catch (err) {
    console.error("Token Error:", err.response?.data || err.message);
    throw err;
  }
};

// Create Shiprocket order
const createOrder = async (orderData) => {
  try {
    if (!token) await generateToken();

    const res = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.log("SHIPROCKET RESPONSE ERROR:", err.response?.data || err.message);
    throw err;
  }
};

module.exports = { createOrder };