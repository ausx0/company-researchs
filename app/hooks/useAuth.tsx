// useAuth.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { defineAbilitiesFor } from "../Rules/defineAbility";
import { AbilityContext } from "../Rules/Can";

interface User {
  role: any;
  // Add other user properties here
}

interface AuthContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initialUserRole = localStorage.getItem("userRole") || "member";

  const [user, setUser] = useState<User>({ role: initialUserRole });

  useEffect(() => {
    if (typeof localStorage === "undefined") return; // Skip in non-browser environments
    const handleStorageChange = () => {
      const updatedRole = localStorage.getItem("userRole") || "member";
      setUser({ role: updatedRole });
    };

    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <AbilityContext.Provider value={defineAbilitiesFor(user)}>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </AbilityContext.Provider>
  );
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
