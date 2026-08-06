"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/lib/axios";
import { getToken, setToken, removeToken } from "@/lib/token";
import ROUTES from "@/config/routes";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/auth/me");

      setUser(response.data.data);
    } catch {
      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }

    fetchCurrentUser();
  }, []);

  const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);

    setToken(response.data.data.token);
    setUser(response.data.data.user);

    router.replace(ROUTES.DASHBOARD);
  };

  const register = async (userData) => {
    const response = await api.post("/auth/register", userData);

    setToken(response.data.data.token);
    setUser(response.data.data.user);

    router.replace(ROUTES.DASHBOARD);
  };

  const logout = () => {
    removeToken();
    setUser(null);

    router.replace(ROUTES.LOGIN);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser: fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
};
