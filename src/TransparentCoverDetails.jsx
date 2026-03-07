import React from "react";
import { useParams } from "react-router-dom";
import {
  getTransparentCoverById,
  getRelatedTransparentCovers,
} from "./transparentCoverData";
import ProductDetailLayout from "./ProductDetailLayout";

const TransparentCoverDetails = () => {
  const { id } = useParams();
  const product = getTransparentCoverById(id);
  const related = product ? getRelatedTransparentCovers(product.id) : [];

  const variants = [
    {
      label: "Default",
      price: product?.price ?? 599,
      mrp: product?.mrp ?? 999,
    },
  ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/transparent-covers"
      title={product?.name}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Model"
      whyBuyLines={[
        "Premium quality transparent covers",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default TransparentCoverDetails;