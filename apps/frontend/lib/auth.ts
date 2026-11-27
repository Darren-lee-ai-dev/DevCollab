
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
  accessToken?: string;
  errors?: {
    field: string;
    message: string;
  }[];
}

async function handleAuthRequest(
  endpoint: string,
  data: RegisterData | LoginData
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
}

export async function registerUser(data: RegisterData) {
  return handleAuthRequest("register", data);
}

export async function loginUser(data: LoginData) {
  return handleAuthRequest("login", data);
}
export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/api/users/me`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Not authenticated");
  }

  return response.json();
}

export async function logoutUser() {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to log out");
  }

  return response.json();
}
