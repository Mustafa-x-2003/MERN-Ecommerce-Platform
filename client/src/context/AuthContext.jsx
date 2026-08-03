import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  register as registerApi,
  login as loginApi,
  getProfile,
  logout as logoutApi,
  changePasswordApi,
} from "../features/auth/auth.service";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const currentUser = async () => {
      try {
        
        setLoading(true);
        const token = localStorage.getItem("token");
        if (token) {
          const res = await getProfile();
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    currentUser();
  }, []);

  const register = async (payload) => {
    try {
      setLoading(true);
      await registerApi(payload);
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    try {
      setLoading(true);
      const res = await loginApi(payload);

      localStorage.setItem("token", res.data.token);
      const profile = await getProfile();
      setUser(profile.data);
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/");
      }, 50);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      setLoading(true);
      await logoutApi();
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const changePassword = async (payload) => {
    try {
      setLoading(true);
      await changePasswordApi(payload);
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({ user, loading, register, login, changePassword, logout }),
    [user, loading],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
