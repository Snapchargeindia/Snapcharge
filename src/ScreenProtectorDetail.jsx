import React from "react";
import { useParams } from "react-router-dom";
import { screenProtectorProducts } from "./screenProtectorData";
import ProductDetailLayout from "./ProductDetailLayout";

const ScreenProtectorDetail = () => {
  const { id } = useParams();

  const productId = Number(id);
  const product = screenProtectorProducts.find((p) => p.id === productId);
  const related = screenProtectorProducts.filter((p) => p.id !== productId).slice(0, 4);

  const variants =
    product?.variants?.map((v) => ({
      label: v,
      price: product?.price ?? 0,
      mrp: product?.mrp ?? 0,
    })) || [
      {
        label: "Default",
        price: product?.price ?? 0,
        mrp: product?.mrp ?? 0,
      },
    ];

  const images =
    product?.images?.length > 0
      ? product.images
      : product?.image
      ? [product.image]
      : [];

  return (
    <ProductDetailLayout
      product={product}
      related={related}
      relatedPath="/screen-protectors"
      title={product?.name}
      description={product?.details || product?.description}
      specs={product?.specs || []}
      deliveryReturn={product?.deliveryReturn || {}}
      images={images}
      variantOptions={variants}
      variantLabel="Select Model"
      whyBuyLines={[
        "Premium quality, device-specific fit",
        "Secure packaging to avoid transit damage",
        "Support for order, tracking & installation help",
      ]}
    />
  );
};

export default ScreenProtectorDetail;