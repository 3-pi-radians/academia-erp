export const API_BASE_URL = "http://localhost:8080/api";

export const API_ENDPOINTS = {
  ORGANISATIONS: "/organisations",
  STUDENTS: "/students",
  AUTH_LOGIN: "/auth/login",
  AUTH_EXCHANGE: "/auth/exchange",
  AUTH_ME: "/auth/me",
} as const;
