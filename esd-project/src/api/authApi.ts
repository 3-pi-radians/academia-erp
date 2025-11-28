import http from "../utils/httpClient";
import { API_ENDPOINTS } from "../constants";
import type { User } from "../models/models";

export const AuthAPI = {
  // Session-based current user
  getUserProfile: () => http.get<User>(API_ENDPOINTS.AUTH_ME),
};
