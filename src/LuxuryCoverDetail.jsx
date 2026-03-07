import React from "react";
import { useParams } from "react-router-dom";
import {
  getLuxuryCoverById,
  getRelatedLuxuryCovers,
} from "./luxuryCoversData";
import ProductDetailLayout from "./ProductDetailLayout";

const LuxuryCoverDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getLuxuryCoverById(paramId);
  const related = product ? getRelatedLuxuryCovers(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "iPhone 15 Pro Max", price: product?.price ?? 1999, mrp: product?.mrp ?? 2699 },
          { label: "iPhone 15 Pro", price: product?.price ?? 1999, mrp: product?.mrp ?? 2699 },
          { label: "iPhone 15", price: product?.price ?? 1999, mrp: product?.mrp ?? 2699 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/luxury-covers"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Model"
      whyBuyLines={[
        "Premium quality luxury covers",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default LuxuryCoverDetail;