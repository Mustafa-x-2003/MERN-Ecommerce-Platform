import React from "react";
import AuthProvider from "../context/AuthContext";
import AddressProvider from "@/context/addressesContext";
import ProductProvider from "@/context/productContext";
import CartProvider from "@/context/cartContext";
import WishlistProvider from "@/context/wishlistContext";
import OrdersProvider from "@/context/ordersContext";
import ScrollToTop from "./ScrollToTop";

function providers({ children }) {
  return (
    <AuthProvider>
      <ScrollToTop />
      <CartProvider>
        <WishlistProvider>
          <ProductProvider>
            <OrdersProvider>
              <AddressProvider>{children}</AddressProvider>
            </OrdersProvider>
          </ProductProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default providers;
