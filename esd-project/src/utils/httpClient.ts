import { API_BASE_URL } from "../constants";

class HttpClient {
  private static instance: HttpClient;

  private constructor() {}

  static getInstance() {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  private async request<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: unknown
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });

    const text = await response.text();
    let data: unknown = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    if (!response.ok) {
      const message =
        (data as any)?.message || response.statusText || "API Error";
      throw new Error(message);
    }

    return data as T;
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, "GET");
  }

  post<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, "POST", body);
  }

  put<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, "PUT", body);
  }

  patch<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, "PATCH", body);
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, "DELETE");
  }
}

export default HttpClient.getInstance();
