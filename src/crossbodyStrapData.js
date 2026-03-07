import cs1 from "./assets/cs1.png";
import cs2 from "./assets/cs2.png";
import cs3 from "./assets/cs3.png";
import cs4 from "./assets/cs4.png";
import cs5 from "./assets/cs5.png";
import cs6 from "./assets/cs6.png";
import cs7 from "./assets/cs7.png";
import cs8 from "./assets/cs8.png";
import cs9 from "./assets/cs9.png";
import cs10 from "./assets/cs10.png";
import cs11 from "./assets/cs11.png";
import cs12 from "./assets/cs12.png";
import cs13 from "./assets/cs13.png";
import cs14 from "./assets/cs14.png";
import cs15 from "./assets/cs15.png";
import cs16 from "./assets/cs16.png";
import cs17 from "./assets/cs17.png";
import cs18 from "./assets/cs18.png";

export const crossbodyStrapProducts = [
  {
    id: 1,
    name: "Crossbody Strap – Neon Yellow",
    color: "Neon Yellow",
    colorCode: "#d6ff00",
    price: 499,
    mrp: 899,
    images: [cs1, cs2, cs3],
    details:
      "Bright neon yellow crossbody strap designed for stylish hands-free carrying with secure hooks and comfortable everyday support.",
    specs: [
      "Adjustable strap length",
      "Strong metal hook locks",
      "Comfortable lightweight design",
      "Durable daily-use material",
      "Easy attachment support",
      "Stylish premium finish",
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Clean gently with a soft cloth and keep away from excess moisture.",
    },
  },
  {
    id: 2,
    name: "Crossbody Strap – Black",
    color: "Black",
    colorCode: "#111111",
    price: 549,
    mrp: 949,
    images: [cs4, cs5, cs6],
    details:
      "Premium black crossbody strap crafted for secure daily carrying with strong attachments and a clean modern look.",
    specs: [
      "Premium strap material",
      "Heavy-duty metal hooks",
      "Adjustable comfortable fit",
      "Lightweight carrying support",
      "Secure attachment clips",
      "Modern clean finish",
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Wipe with a soft dry cloth.",
    },
  },
  {
    id: 3,
    name: "Crossbody Strap – Green",
    color: "Green",
    colorCode: "#3f7f4f",
    price: 599,
    mrp: 999,
    images: [cs7, cs8, cs9],
    details:
      "Elegant green crossbody strap built for everyday comfort, durable support and a premium stylish appearance.",
    specs: [
      "Luxury finish strap design",
      "Adjustable long-wear comfort",
      "Strong secure metal fittings",
      "Durable support structure",
      "Smooth premium texture",
      "Stylish everyday usability",
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Store dry and clean softly when needed.",
    },
  },
  {
    id: 4,
    name: "Crossbody Strap – Tan",
    color: "Tan",
    colorCode: "#b8845a",
    price: 649,
    mrp: 1049,
    images: [cs10, cs11, cs12],
    details:
      "Modern tan crossbody strap with durable construction and refined styling for secure and comfortable everyday use.",
    specs: [
      "Modern minimal strap styling",
      "Strong attachment hooks",
      "Adjustable fit length",
      "Comfortable shoulder support",
      "Durable everyday material",
      "Slim lightweight profile",
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Clean with a soft cloth. Avoid harsh chemicals.",
    },
  },
  {
    id: 5,
    name: "Crossbody Strap – Light Gray",
    color: "Light Gray",
    colorCode: "#d3d3d3",
    price: 699,
    mrp: 1099,
    images: [cs13, cs14, cs15],
    details:
      "Designer light gray crossbody strap made for premium style, secure support and reliable daily carrying.",
    specs: [
      "Designer premium appearance",
      "Strong locking metal clips",
      "Comfortable adjustable size",
      "Reliable long-use durability",
      "Smooth premium finish",
      "Easy secure attachment",
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Use a dry microfiber cloth for cleaning.",
    },
  },
  {
    id: 6,
    name: "Crossbody Strap – Light Blue",
    color: "Light Blue",
    colorCode: "#a9d7f5",
    price: 749,
    mrp: 1149,
    images: [cs16, cs17, cs18],
    details:
      "Light blue utility crossbody strap designed for practical comfort, strong support and stylish all-day carrying convenience.",
    specs: [
      "Utility-focused durable design",
      "Adjustable crossbody support",
      "Heavy-duty hooks and clips",
      "Comfort-fit shoulder use",
      "Long-lasting material quality",
      "Clean practical finish",
    ],
    deliveryReturn: {
      shipping: "Free delivery on prepaid orders. Dispatch within 24-48 hours.",
      returns: "7-day replacement for manufacturing defects only.",
      care: "Keep dry and wipe gently after use.",
    },
  },
];

export function getCrossbodyStrapById(id) {
  return crossbodyStrapProducts.find((p) => p.id === Number(id)) || null;
}

export function getRelatedCrossbodyStraps(currentId) {
  return crossbodyStrapProducts
    .filter((p) => p.id !== Number(currentId))
    .slice(0, 4);
}