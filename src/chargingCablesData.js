// src/chargingCablesData.js

export const chargingCableProducts = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: `Charging Cable ${i + 1}`,
  price: 499 + (i % 4) * 50,
  mrp: 899 + (i % 4) * 50,
  images: [],
  details:
    "Durable fast-charging cable designed with tangle-free construction, strong connectors and reliable everyday performance.",
  specs: [
    "Fast charging support",
    "Tangle-free durable design",
    "Strong reinforced connectors",
    "Stable power transfer",
    "Portable everyday use",
    "Wide compatibility support",
  ],
  variants: [
    { label: "Type-C", price: 499 + (i % 4) * 50, mrp: 899 + (i % 4) * 50 },
    { label: "Lightning", price: 549 + (i % 4) * 50, mrp: 949 + (i % 4) * 50 },
    { label: "Braided", price: 599 + (i % 4) * 50, mrp: 999 + (i % 4) * 50 },
  ],
  deliveryReturn: {
    shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
    returns: "7-day replacement for manufacturing defects only.",
    care: "Avoid sharp bends and unplug gently after use.",
  },
}));

export function getChargingCableById(id) {
  return chargingCableProducts.find((p) => p.id === Number(id)) || null;
}

export function getRelatedChargingCables(currentId) {
  return chargingCableProducts
    .filter((p) => p.id !== Number(currentId))
    .slice(0, 4);
}