import React from "react";
import { useParams } from "react-router-dom";
import {
  getAndroidCoverById,
  getRelatedAndroidCovers,
} from "./androidCoverData";
import ProductDetailLayout from "./ProductDetailLayout";

const AndroidCoverDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getAndroidCoverById(paramId);
  const related = product ? getRelatedAndroidCovers(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "Samsung S24 Ultra", price: product?.price ?? 899, mrp: product?.mrp ?? 1499 },
          { label: "Samsung S24", price: product?.price ?? 899, mrp: product?.mrp ?? 1499 },
          { label: "OnePlus 12", price: product?.price ?? 899, mrp: product?.mrp ?? 1499 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/android-covers"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Model"
      whyBuyLines={[
        "Premium quality covers",
        "Secure packaging for safer delivery",
        "Support for order and tracking help",
      ]}
    />
  );
};

export default AndroidCoverDetail;