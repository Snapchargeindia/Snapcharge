import React from "react";
import { useParams } from "react-router-dom";
import {
  getWatchCaseById,
  getRelatedWatchCases,
} from "./watchCaseData";
import ProductDetailLayout from "./ProductDetailLayout";

const WatchCaseDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getWatchCaseById(paramId);
  const related = product ? getRelatedWatchCases(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "41mm", price: product?.price ?? 599, mrp: product?.mrp ?? 999 },
          { label: "45mm", price: product?.price ?? 599, mrp: product?.mrp ?? 999 },
          { label: "Ultra", price: (product?.price ?? 599) + 100, mrp: (product?.mrp ?? 999) + 100 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/watch-cases"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Size"
      whyBuyLines={[
        "Premium quality watch cases",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default WatchCaseDetail;