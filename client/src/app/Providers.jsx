import React from "react";
import AuthProvider from "../context/AuthContext";
import AddressProvider from "@/context/addressesContext";

function providers({ children }) {
  return (
    <AuthProvider>
      <AddressProvider>{children}</AddressProvider>
    </AuthProvider>
  );
}

export default providers;
