// import { useProduct } from "@/context/productContext";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import ProductGallery from "../components/ProductGallery";

import { useProduct } from "@/context/productContext";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import { useParams } from "react-router";
import { useEffect } from "react";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const { handelgetProduct, product, loading } = useProduct();
//   useEffect(() => {
//     handelgetProduct(id);
//   }, [id, handelgetProduct]);
//   console.log(product);

//   return (
//     <div className="py-10 px-4 md:px-0">
//       <ProductGallery images={product?.images} loading={loading.getProduct} />
//     </div>
//   );
// }

// import ProductGallery from "./ProductGallery";
// import ProductInfo from "./ProductInfo";

export default function ProductDetails() {
  const { id } = useParams();
  const { handelgetProduct, product, loading } = useProduct();

  useEffect(() => {
    handelgetProduct(id);
  }, [id, handelgetProduct]);

  if (loading.getProduct) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery loading={loading.getProduct} />

          <div className="animate-pulse space-y-5">
            <div className="h-10 w-3/4 rounded bg-muted" />
            <div className="h-5 w-1/3 rounded bg-muted" />
            <div className="h-20 w-full rounded bg-muted" />
            <div className="h-10 w-1/2 rounded bg-muted" />
            <div className="h-12 w-full rounded bg-muted" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8 lg:py-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <ProductGallery images={product?.images} />

        <ProductInfo product={product}  />
      </div>
    </section>
  );
}
