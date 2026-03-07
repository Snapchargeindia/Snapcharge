import React from "react";
import { useParams } from "react-router-dom";
import {
  getTechWovenById,
  getRelatedTechWoven,
} from "./techWovenData";
import ProductDetailLayout from "./ProductDetailLayout";

const TechWovenDetail = () => {
  const { id } = useParams();

  const product = getTechWovenById(id);
  const related = product ? getRelatedTechWoven(product.id) : [];

  const variants =
    product?.variants?.length
      ? product.variants
      : [
          {
            label: "Default",
            price: product?.price ?? 1999,
            mrp: product?.mrp ?? 4900,
          },
        ];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/tech-woven"
      title={product ? `${product.name} – ${product.colorName}` : ""}
      description={product?.details}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={product?.images || []}
      variantOptions={variants}
      variantLabel="Select Device"
      colorOptions={product?.colors || []}
      whyBuyLines={[
        "Premium quality tech woven covers",
        "Secure packaging for safer delivery",
        "Support for order and tracking assistance",
      ]}
    />
  );
};

export default TechWovenDetail;