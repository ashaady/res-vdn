import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "admin" | "manager" | "customer";

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  is_active: boolean;
  avatar_url?: string;
  last_login?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  canAccess: (requiredRole: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default test users
const DEFAULT_USERS: { [key: string]: User & { password: string } } = {
  "admin@app.com": {
    id: "admin-001",
    email: "admin@app.com",
    password: "password123",
    full_name: "Admin VDN",
    phone: "77 123 45 67",
    role: "admin",
    is_active: true,
    avatar_url: "👨‍💼",
  },
  "manager@app.com": {
    id: "manager-001",
    email: "manager@app.com",
    password: "password123",
    full_name: "Manager VDN",
    phone: "78 123 45 67",
    role: "manager",
    is_active: true,
    avatar_url: "📊",
  },
  "customer@app.com": {
    id: "customer-001",
    email: "customer@app.com",
    password: "password123",
    full_name: "Client VDN",
    phone: "76 123 45 67",
    role: "customer",
    is_active: true,
    avatar_url: "👤",
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Verify user still exists in default users
      if (DEFAULT_USERS[parsedUser.email]) {
        setUser(parsedUser);
      } else {
        localStorage.removeItem("currentUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const userCredentials = DEFAULT_USERS[email];

    if (!userCredentials || userCredentials.password !== password) {
      setIsLoading(false);
      throw new Error("Email ou mot de passe incorrect");
    }

    if (!userCredentials.is_active) {
      setIsLoading(false);
      throw new Error("Ce compte est désactivé");
    }

    const loggedInUser: User = {
      id: userCredentials.id,
      email: userCredentials.email,
      full_name: userCredentials.full_name,
      phone: userCredentials.phone,
      role: userCredentials.role,
      is_active: userCredentials.is_active,
      avatar_url: userCredentials.avatar_url,
      last_login: new Date().toISOString(),
    };

    // Save to localStorage
    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    return user.role === roles;
  };

  const canAccess = (requiredRole: UserRole | UserRole[]): boolean => {
    return hasRole(requiredRole);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        hasRole,
        canAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
