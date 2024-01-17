import { ReactNode, createContext, useContext, useMemo, useState } from "react";

interface User {
  username: string;
}

interface AuthContextType {
  user?: User | null;
  login?: (userData: User) => void;
  logout?: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  // experimental
  const obj = useMemo(() => ({ user, login, logout }), []);

  return <AuthContext.Provider value={obj}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
