import React from "react";
import { useParams } from "react-router-dom";
import {
  getCrossbodyStrapById,
  getRelatedCrossbodyStraps,
} from "./crossbodyStrapData";
import ProductDetailLayout from "./ProductDetailLayout";

const CrossbodyStrapDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getCrossbodyStrapById(paramId);
  const related = product ? getRelatedCrossbodyStraps(product.id) : [];

  const colorOption = product
    ? [
        {
          label: product.color || "Color",
          price: product.price ?? 0,
          mrp: product.mrp ?? 0,
        },
      ]
    : [];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/crossbody-straps"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={colorOption}
      variantLabel="Select Color"
      whyBuyLines={[
        "Premium quality accessories",
        "Secure packaging for safe delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default CrossbodyStrapDetail;