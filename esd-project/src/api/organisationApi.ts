import http from "../utils/httpClient";
import { API_ENDPOINTS } from "../constants";
import type { Organisation } from "../models/models";

const ORG = API_ENDPOINTS.ORGANISATIONS;

export const OrganisationAPI = {
  getAll: () => http.get<Organisation[]>(ORG),
  getById: (id: number) => http.get<Organisation>(`${ORG}/${id}`),
  create: (data: Organisation) => http.post<Organisation>(ORG, data),
  update: (id: number, data: Organisation) =>
    http.put<Organisation>(`${ORG}/${id}`, data),
  remove: (id: number) => http.delete<void>(`${ORG}/${id}`),
};
