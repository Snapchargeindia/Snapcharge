import React from "react";
import { useParams } from "react-router-dom";
import {
  getLeatherCollectionMagsafeById,
  getRelatedLeatherCollectionMagsafe,
} from "./leatherCollectionMagsafeData";
import ProductDetailLayout from "./ProductDetailLayout";

const LeatherCollectionMagsafeDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getLeatherCollectionMagsafeById(paramId);
  const related = product ? getRelatedLeatherCollectionMagsafe(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "iPhone 15 Pro Max", price: product?.price ?? 1799, mrp: product?.mrp ?? 2499 },
          { label: "iPhone 15 Pro", price: product?.price ?? 1799, mrp: product?.mrp ?? 2499 },
          { label: "iPhone 15", price: product?.price ?? 1799, mrp: product?.mrp ?? 2499 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/leather-collection-magsafe"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Model"
      whyBuyLines={[
        "Premium quality leather covers",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default LeatherCollectionMagsafeDetail;