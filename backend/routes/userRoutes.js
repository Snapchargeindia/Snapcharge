const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.put("/update-address/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { addressLine, city, state, pincode } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        addressLine,
        city,
        state,
        pincode,
      },
      { new: true }
    );

    res.json({
      success: true,
      user,
    });

  } catch (error) {
    console.log("ADDRESS UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update address",
    });
  }
});

module.exports = router;