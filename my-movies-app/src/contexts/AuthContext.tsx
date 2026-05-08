import { createContext } from "react";
import type { User } from "../models/User";

interface AuthContextType {
  currentUser: User;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
