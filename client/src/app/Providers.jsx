import React from "react";
import AuthProvider from "../context/AuthContext";
import AddressProvider from "@/context/addressesContext";
import ProductProvider from "@/context/productContext";
import CartProvider from "@/context/cartContext";
import WishlistProvider from "@/context/wishlistContext";

function providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ProductProvider>
            <AddressProvider>{children}</AddressProvider>
          </ProductProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default providers;
