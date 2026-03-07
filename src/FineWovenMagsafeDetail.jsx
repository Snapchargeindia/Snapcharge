import React from "react";
import { useParams } from "react-router-dom";
import {
  getFineWovenMagsafeById,
  getRelatedFineWovenMagsafe,
} from "./fineWovenMagsafeData";
import ProductDetailLayout from "./ProductDetailLayout";

const FineWovenMagsafeDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getFineWovenMagsafeById(paramId);
  const related = product ? getRelatedFineWovenMagsafe(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "iPhone 15 Pro Max", price: product?.price ?? 1299, mrp: product?.mrp ?? 1999 },
          { label: "iPhone 15 Pro", price: product?.price ?? 1299, mrp: product?.mrp ?? 1999 },
          { label: "iPhone 15", price: product?.price ?? 1299, mrp: product?.mrp ?? 1999 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/fine-woven-magsafe"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Model"
      whyBuyLines={[
        "Premium quality products",
        "Secure packaging for safer delivery",
        "Support for order, tracking & assistance",
      ]}
    />
  );
};

export default FineWovenMagsafeDetail;