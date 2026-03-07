import React from "react";
import { useParams } from "react-router-dom";
import {
  getCarbonCoverById,
  getRelatedCarbonCovers,
} from "./carbonCoverData";
import ProductDetailLayout from "./ProductDetailLayout";

const CarbonCoverDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getCarbonCoverById(paramId);
  const related = product ? getRelatedCarbonCovers(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "iPhone 15 Pro Max", price: product?.price ?? 1299, mrp: product?.mrp ?? 1799 },
          { label: "iPhone 15 Pro", price: product?.price ?? 1299, mrp: product?.mrp ?? 1799 },
          { label: "iPhone 15", price: product?.price ?? 1299, mrp: product?.mrp ?? 1799 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/carbon-covers"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Model"
      whyBuyLines={[
        "Premium quality carbon covers",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default CarbonCoverDetail;