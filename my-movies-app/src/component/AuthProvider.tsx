import { type ReactNode, useState } from "react";
import type { User } from "../models/User";
import { AuthContext } from "../contexts/AuthContext";

interface ContextProps {
  children: ReactNode;
}

function AuthProvider({ children }: ContextProps) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("current_user") || "null"),
  );

  function login(user: User) {
    setCurrentUser(user);
    localStorage.setItem("current_user", JSON.stringify(user));
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("current_user");
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
