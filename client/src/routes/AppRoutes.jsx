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

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        >
          <Route path="edit" element={<EditProfile />} />
          <Route path="password" element={<ChangePassword />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}
