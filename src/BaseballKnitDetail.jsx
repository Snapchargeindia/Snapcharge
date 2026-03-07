import React from "react";
import { useParams } from "react-router-dom";
import {
  getBaseballKnitById,
  getRelatedBaseballKnit,
} from "./baseballKnitData";
import ProductDetailLayout from "./ProductDetailLayout";

const BaseballKnitDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getBaseballKnitById(paramId);
  const related = product ? getRelatedBaseballKnit(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "iPhone 15 Pro Max", price: product?.price ?? 1199, mrp: product?.mrp ?? 1699 },
          { label: "iPhone 15 Pro", price: product?.price ?? 1199, mrp: product?.mrp ?? 1699 },
          { label: "iPhone 15", price: product?.price ?? 1199, mrp: product?.mrp ?? 1699 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/baseball-knit"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Model"
      whyBuyLines={[
        "Premium quality sporty covers",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default BaseballKnitDetail;