import React from "react";

import LoginPage from "../features/auth/pages/LoginPage";
import HomePage from "../features/home/pages/HomePage";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "../features/auth/pages/RegisterPage";
import MainLayout from "../components/layout/MainLayout";
import ProfilePage from "../features/profile/pages/ProfilePage";
import EditProfile from "../features/profile/pages/EditProfile";
import ChangePassword from "@/features/profile/pages/ChangePassword";
import Addresses from "../features/profile/pages/Addresses";
import Settings from "../features/profile/pages/Settings";
import ProfileOverview from "../features/profile/pages/ProfileOverview";
import ProductsPage from "@/features/products/pages/ProductsPage";
import CartPage from "@/features/cart/pages/CartPage";
import WishlistPage from "@/features/wishlist/pages/WishlistPage";
import ProductDetails from "@/features/products/pages/ProductDetails";
import Orderspage from "@/features/orders/pages/Orderspage";
import OrderDetails from "@/features/orders/pages/OrderDetails";
import CheckoutPage from "@/features/checkout/pages/CheckoutPage";
import OrderSuccessPage from "@/features/successfuly/pages/SuccessfulyPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <Orderspage />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="success/:id"
          element={
            <ProtectedRoute>
              <OrderSuccessPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="orderDetails/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="productDetails/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        >
          <Route path="overview" element={<ProfileOverview />} />
          <Route path="edit" element={<EditProfile />} />
          <Route path="password" element={<ChangePassword />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}
