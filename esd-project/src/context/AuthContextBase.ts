import { createContext } from "react";
import type { User } from "../models/models";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginWithOAuth: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
