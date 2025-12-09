import { useState, useEffect } from "react";

interface User {
  user_name: string;
}

interface AuthResponse {
  user: User;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const fetchUser = async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/auth/session",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.error("Failed to fetch user");
      setUser(null);
      return;
    }

    const data = (await response.json()) as AuthResponse;
    setUser({ user_name: data.user.user_name });
  };

  const login = async () => {
    if (!username || !password) return false;

    const response = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name: username, password }),
    });

    if (!response.ok) {
      console.error("Login failed");
      setUser(null);
      return false;
    }

    const data = (await response.json()) as User;
    setUser({ user_name: data.user_name });
    return true;
  };

  const logout = async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/auth/logout",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Logout failed");
      return false;
    }

    setUser(null);
    return true;
  };

  const register = async () => {
    if (!username || !email || !password) return false;

    const response = await fetch(
      import.meta.env.VITE_API_URL + "/auth/register",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: username, email, password }),
      }
    );

    if (!response.ok) {
      console.error("Registration failed");
      setUser(null);
      return false;
    }

    const data = (await response.json()) as User;
    setUser({ user_name: data.user_name });
    return true;
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    fetchUser,
    login,
    logout,
    register,
    user,
    setUsername,
    setPassword,
    setEmail,
  };
};
