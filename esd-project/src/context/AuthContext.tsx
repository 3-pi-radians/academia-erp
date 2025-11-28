import { useEffect, useState, type ReactNode } from "react";
import http from "../utils/httpClient";
import { AuthAPI } from "../api/authApi";
import type { User } from "../models/models";
import { CONFIG } from "../constants";
import { AuthContext } from "./AuthContextBase";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore user from stored token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      queueMicrotask(() => setLoading(false));
      return;
    }

    http.setToken(token);

    AuthAPI.getUserProfile()
      .then((u) => setUser(u))
      .catch(() => {
        localStorage.removeItem("token");
        http.setToken(null);
      })
      .finally(() => queueMicrotask(() => setLoading(false)));
  }, []);

  const loginWithOAuth = () => {
    const clientId = CONFIG.OAUTH_CLIENT_ID;

    if (!clientId) {
      console.error("❌ Missing Google OAuth Client ID.");
      alert(
        "Google OAuth client ID is missing. Please set VITE_GOOGLE_CLIENT_ID in your .env file."
      );
      return;
    }

    // Print to verify environment is loaded
    console.log("Loaded Google Client ID:", clientId);

    // -------------------------------
    // Build OAuth URL
    // -------------------------------
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: CONFIG.OAUTH_REDIRECT_URI,
      response_type: "code",
      scope: CONFIG.OAUTH_SCOPE,
      access_type: "offline",
      prompt: "consent",
    });

    const url =
      `${CONFIG.OAUTH_PROVIDER_URL}?${params.toString()}` +
      (CONFIG.OAUTH_EXTRA_PARAMS ? `&${CONFIG.OAUTH_EXTRA_PARAMS}` : "");

    // Print full URL → THIS helps detect missing client_id
    console.log("Final OAuth Redirect URL:", url);

    // -------------------------------
    // Actual Redirect
    // -------------------------------
    window.location.href = url;
  };

  const logout = () => {
    localStorage.removeItem("token");
    http.setToken(null);
    setUser(null);
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
