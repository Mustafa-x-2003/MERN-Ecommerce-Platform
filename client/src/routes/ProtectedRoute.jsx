import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { Navigate} from "react-router";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  // const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
