import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useLocalStorage } from "./useLocalStorage";

import api from '../lib/api'

const AuthContext = createContext({
  user: null
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [authToken, setAuthToken] = useLocalStorage("authToken", null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    const response = await api.login(username, password)

    if (response.ok) {
      const data = await response.json()
      setUser(data);
      setAuthToken(response.headers.get('Authorization'))
      navigate("/app");
    } else {
      setUser(null);
      setAuthToken(null)
      throw new Error(`Authentication failed. Response status: ${response.status}`)
    }
  };

  const logout = async () => {
    const response = await api.logout({ Authorization: authToken })

    if (response.ok) {
      setUser(null);
      setAuthToken(null)
      navigate("/", { replace: true });
    } else {
      throw new Error(`Logging out failed. Response status: ${response.status}`)
    }
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      authToken
    }),
    [user, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};