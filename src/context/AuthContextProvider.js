import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user?.token) {
      import("axios").then(({ default: axios }) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      });
    } else {
      import("axios").then(({ default: axios }) => {
        delete axios.defaults.headers.common["Authorization"];
      });
    }
  }, [user]);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    window.location.href = "/";
  };

  const logout = () => {
    localStorage.setItem("user", null);
    setUser(null);
    window.location.href = "/login";
  };

  const checkIsUserLogged = (responseStatus) => {
    if (responseStatus === 403 || responseStatus === 401) {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, checkIsUserLogged }}
    >
      {children}
    </AuthContext.Provider>
  );
};
