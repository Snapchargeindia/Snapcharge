import React from "react";
import { useParams } from "react-router-dom";
import {
  getMetalRingLeatherById,
  getRelatedMetalRingLeather,
} from "./metalRingLeatherData";
import ProductDetailLayout from "./ProductDetailLayout";

const MetalRingLeatherDetail = () => {
  const { id } = useParams();

  const product = getMetalRingLeatherById(id);
  const related = product ? getRelatedMetalRingLeather(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          {
            label: "Default",
            price: product?.price ?? 1699,
            mrp: product?.mrp ?? 2299,
          },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/metal-ring-leather"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Model"
      whyBuyLines={[
        "Premium quality metal ring leather covers",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default MetalRingLeatherDetail;