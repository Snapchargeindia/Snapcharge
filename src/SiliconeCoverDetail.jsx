import React from "react";
import { useParams } from "react-router-dom";
import {
  getSiliconeCoverById,
  getRelatedSiliconeCovers,
} from "./siliconeCoverData";
import ProductDetailLayout from "./ProductDetailLayout";

const SiliconeCoverDetail = () => {
  const params = useParams();
  const paramId = params.id || Object.values(params)[0];

  const product = getSiliconeCoverById(paramId);
  const related = product ? getRelatedSiliconeCovers(product.id) : [];

  const variants = product?.variants?.length
    ? product.variants
    : [
        {
          label: "iPhone 15 Pro Max",
          price: product?.price ?? 799,
          mrp: product?.mrp ?? 1299,
        },
        {
          label: "iPhone 15 Pro",
          price: product?.price ?? 799,
          mrp: product?.mrp ?? 1299,
        },
        {
          label: "iPhone 15",
          price: product?.price ?? 799,
          mrp: product?.mrp ?? 1299,
        },
      ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/silicone-covers"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Model"
      whyBuyLines={[
        "Premium quality silicone covers",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default SiliconeCoverDetail;