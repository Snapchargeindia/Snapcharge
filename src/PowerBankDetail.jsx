import React from "react";
import { useParams } from "react-router-dom";
import {
  getPowerBankById,
  getRelatedPowerBanks,
} from "./powerBankData";
import ProductDetailLayout from "./ProductDetailLayout";

const PowerBankDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getPowerBankById(paramId);
  const related = product ? getRelatedPowerBanks(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          { label: "10000mAh", price: product?.price ?? 1499, mrp: product?.mrp ?? 2199 },
          { label: "20000mAh", price: (product?.price ?? 1499) + 200, mrp: (product?.mrp ?? 2199) + 200 },
          { label: "Wireless", price: (product?.price ?? 1499) + 400, mrp: (product?.mrp ?? 2199) + 400 },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/power-bank"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Variant"
      whyBuyLines={[
        "Premium quality power banks",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default PowerBankDetail;