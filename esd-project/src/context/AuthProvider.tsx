import { useEffect, useState, type ReactNode } from "react";

import { AuthAPI } from "../api/authApi";
import type { User } from "../models/models";
import { API_BASE_URL } from "../constants";
import { ROUTES } from "../constants";

import { AuthContext } from "./AuthContextBase";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthAPI.getUserProfile()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const loginWithOAuth = () => {
    const backendBase = API_BASE_URL.replace(/\/api$/, "");
    window.location.href = `${backendBase}/oauth2/authorization/google`;
  };

  const logout = () => {
    window.location.href = ROUTES.LOGOUT_PROCESS;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        loginWithOAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
