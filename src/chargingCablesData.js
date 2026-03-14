import cable1 from "./assets/cable1.jpeg";
import cable2 from "./assets/cable2.jpeg";
import cable3 from "./assets/cable3.jpeg";
import cable4 from "./assets/cable4.jpeg";
import cable5 from "./assets/cable5.jpeg";
import cable6 from "./assets/cable6.jpeg";
import cable7 from "./assets/cable7.jpeg";
import cable8 from "./assets/cable8.jpeg";
import cable9 from "./assets/cable9.jpeg";

export const chargingCableProducts = [
  {
    id: 1,
    name: "USB-C to USB-C Fast Charging Cable",
    price: 499,
    mrp: 899,
    images: [cable1,cable2,cable3],
    details:
      "Premium USB-C to USB-C fast charging cable built for stable power delivery, smooth syncing and reliable everyday use.",
    specs: [
      "USB-C to USB-C connection",
      "Fast charging support",
      "Stable data transfer",
      "Strong reinforced connectors",
      "Flexible tangle-free cable",
      "Wide device compatibility",
    ],
    variants: [
      { label: "1 Meter", price: 499, mrp: 899 },
      { label: "Braided", price: 549, mrp: 949 },
      { label: "Premium Build", price: 599, mrp: 999 },
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Avoid sharp bends and unplug gently after use.",
    },
  },

  {
    id: 2,
    name: "USB-C to Lightning Fast Charging Cable",
    price: 549,
    mrp: 949,
    images: [cable4,cable5,cable6],
    details:
      "Reliable USB-C to Lightning cable designed for fast charging iPhones and Apple devices with durable connectors and smooth performance.",
    specs: [
      "USB-C to Lightning connection",
      "Fast charging support for iPhone",
      "Durable connector protection",
      "Smooth and stable charging",
      "Long-lasting cable body",
      "Ideal for Apple devices",
    ],
    variants: [
      { label: "1 Meter", price: 549, mrp: 949 },
      { label: "Braided", price: 599, mrp: 999 },
      { label: "Premium Build", price: 649, mrp: 1049 },
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Avoid sharp bends and unplug gently after use.",
    },
  },

  {
    id: 3,
    name: "USB-C to USB-C 2 Meter Charging Cable",
    price: 599,
    mrp: 999,
    images: [cable7,cable8,cable9],
    details:
      "Extra-long 2 meter USB-C to USB-C cable made for comfortable charging distance, strong durability and everyday fast charging.",
    specs: [
      "2 meter extra-long cable",
      "Fast charging support",
      "USB-C to USB-C connection",
      "Durable strong connectors",
      "Flexible long-reach design",
      "Perfect for desk and bedside use",
    ],
    variants: [
      { label: "2 Meter", price: 599, mrp: 999 },
      { label: "Braided 2 Meter", price: 649, mrp: 1049 },
      { label: "Premium 2 Meter", price: 699, mrp: 1099 },
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Avoid twisting the cable excessively and store loosely after use.",
    },
  },
];

export function getChargingCableById(id) {
  return chargingCableProducts.find((p) => p.id === Number(id)) || null;
}

export function getRelatedChargingCables(currentId) {
  return chargingCableProducts
    .filter((p) => p.id !== Number(currentId))
    .slice(0, 3);
}