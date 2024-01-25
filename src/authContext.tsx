import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface AuthContextType {
  user?: string | null;
  token?: string | null;
  login?: (data: any) => void;
  logout?: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({});

const AuthProvider = ({ children }: AuthProviderProps) => {
  // const [user, setUser] = useState<User | null>(null);
  // const a = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (data: any) => {
    const { user, token } = data;
    setUser(JSON.stringify(user));
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // look further into useMemo here
  const contextValue = {
    user,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
