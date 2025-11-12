// src/auth.js

// === Your Cognito Hosted UI configuration ===
const domain = "us-east-1ov4f5m5t2.auth.us-east-1.amazoncognito.com";
const clientId = "7tugjqis2m9jqalm2gmmkgjrr1";
const redirectUri = "http://localhost:1234";
const logoutUri = "http://localhost:1234";

// === Construct login/logout URLs ===
const cognitoAuthUrl = `https://${domain}/login?client_id=${clientId}&response_type=token&scope=openid+email+profile&redirect_uri=${redirectUri}`;
const cognitoLogoutUrl = `https://${domain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;

// === Redirect to Cognito Hosted UI ===
export function login() {
  console.log("Redirecting to:", cognitoAuthUrl);
  window.location.href = cognitoAuthUrl;
}

// === Logout and clear token ===
export function logout() {
  localStorage.removeItem("idToken");
  localStorage.removeItem("user");
  window.location.href = cognitoLogoutUrl;
}

// === Parse token from URL after login ===
export function getUserToken() {
  const hash = window.location.hash;
  if (hash.includes("id_token")) {
    const token = new URLSearchParams(hash.substring(1)).get("id_token");
    localStorage.setItem("idToken", token);
    window.history.replaceState({}, document.title, "/");
    return token;
  }
  return localStorage.getItem("idToken");
}

// === Decode user info ===
export function getUser() {
  const token = getUserToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const user = { email: payload.email, name: payload.name };
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch {
    return null;
  }
}
