import React from "react";
import AuthProvider from "../context/AuthContext";

function providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default providers;
