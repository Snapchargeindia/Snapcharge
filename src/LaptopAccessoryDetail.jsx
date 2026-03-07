import React from "react";
import { useParams } from "react-router-dom";
import {
  getLaptopAccessoryById,
  getRelatedLaptopAccessories,
} from "./laptopAccessoriesData";
import ProductDetailLayout from "./ProductDetailLayout";

const LaptopAccessoryDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getLaptopAccessoryById(paramId);
  const related = product ? getRelatedLaptopAccessories(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "Standard", price: product?.price ?? 1499, mrp: product?.mrp ?? 2199 },
          { label: "Pro", price: (product?.price ?? 1499) + 200, mrp: (product?.mrp ?? 2199) + 200 },
          { label: "Multi-Port", price: (product?.price ?? 1499) + 400, mrp: (product?.mrp ?? 2199) + 400 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/laptop-accessories"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Variant"
      whyBuyLines={[
        "Premium quality laptop accessories",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default LaptopAccessoryDetail;