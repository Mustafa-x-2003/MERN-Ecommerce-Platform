import { BrowserRouter, Route, Routes } from "react-router";

import Layout from "../components/layout/Layout";
import HomePage from "../Features/home/pages/HomePage";
import LoginPage from "../Features/auth/pages/LoginPage";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
