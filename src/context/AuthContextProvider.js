import { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const resId = api.interceptors.response.use(
      (res) => res,
      (err) => {
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          logout();
        }
        return Promise.reject(err);
      }
    );

    return () => {
      api.interceptors.response.eject(resId);
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const checkIsUserLogged = (responseStatus) => {
    if (responseStatus === 403 || responseStatus === 401) {
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
