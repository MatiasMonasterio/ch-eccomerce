import type { Token } from "../../types";
import type { User } from "../../domain";

import { useState } from "react";
import jwtDecode from "jwt-decode";

import UserContext from "./UserContext";

interface Props {
  children: React.ReactNode;
}

const userLocalStorage: User = JSON.parse(localStorage.getItem("user") || "{}");

const userInitialValue: User = {
  id: userLocalStorage.id || "",
  email: userLocalStorage.email || "",
  iat: userLocalStorage.iat || 0,
};

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User>(userInitialValue);

  const login = (token: Token) => {
    const user = jwtDecode<User>(token);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(userInitialValue);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
}
