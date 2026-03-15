const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.put("/update-address/:id", async (req, res) => {
  try {
    console.log("UPDATE ADDRESS ROUTE HIT");
    console.log("PARAM ID:", req.params.id);
    console.log("BODY:", req.body);

    const { id } = req.params;

    const {
      fullName,
      phone,
      address,
      addressLine,
      city,
      state,
      pincode,
      addressType,
    } = req.body;

    const updateData = {
      city: city || "",
      state: state || "",
      pincode: pincode || "",
    };

    if (fullName) updateData.name = fullName;
    if (phone) updateData.phone = phone;

    // frontend kabhi address bhej raha hai, kabhi addressLine
    if (address) {
      updateData.address = address;
      updateData.addressLine = address;
    } else if (addressLine) {
      updateData.address = addressLine;
      updateData.addressLine = addressLine;
    }

    if (addressType) {
      updateData.addressType = addressType;
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      user,
    });
  } catch (error) {
    console.log("ADDRESS UPDATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update address",
      error: error.message,
    });
  }
});

module.exports = router;