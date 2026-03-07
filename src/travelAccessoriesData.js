// src/travelAccessoriesData.js

export const travelAccessoryProducts = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  name: `Travel Accessory ${i + 1}`,
  price: 899 + (i % 7) * 60,
  mrp: 1399 + (i % 7) * 60,
  images: [],
  details:
    "Travel-friendly charging and organizing accessory designed for trips, daily commute and smooth portable use.",
  specs: [
    "Compact travel-friendly design",
    "Portable everyday utility",
    "Durable premium build",
    "Easy organization support",
    "Lightweight carry design",
    "Reliable daily-use performance",
  ],
  variants: [
    { label: "Standard", price: 899 + (i % 7) * 60, mrp: 1399 + (i % 7) * 60 },
    { label: "Pro Travel", price: 999 + (i % 7) * 60, mrp: 1499 + (i % 7) * 60 },
    { label: "Organizer Kit", price: 1099 + (i % 7) * 60, mrp: 1599 + (i % 7) * 60 },
  ],
  deliveryReturn: {
    shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
    returns: "7-day replacement for manufacturing defects only.",
    care: "Keep dry and clean gently with a soft cloth.",
  },
}));

export function getTravelAccessoryById(id) {
  return travelAccessoryProducts.find((p) => p.id === Number(id)) || null;
}

export function getRelatedTravelAccessories(currentId) {
  return travelAccessoryProducts
    .filter((p) => p.id !== Number(currentId))
    .slice(0, 4);
}