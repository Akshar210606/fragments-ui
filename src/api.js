// src/api.js

// Use your EC2 fragments API URL
export const API_URL = "http://ec2-52-206-187-39.compute-1.amazonaws.com:8080";

/**
 * Helper to make authenticated requests
 */
export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("idToken");
  const headers = options.headers || {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(`${API_URL}${path}`, { ...options, headers });
}
