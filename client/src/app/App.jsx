import React from "react";
import Providers from "./Providers";
import AppRoutes from "../routes/AppRoutes";
import { BrowserRouter } from "react-router";
// =====================================
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <Providers>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={2000} />
      </Providers>
    </BrowserRouter>
  );
}
