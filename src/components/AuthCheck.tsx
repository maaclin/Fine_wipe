import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthState";

interface AuthCheckProps {
  children: ReactNode;
}

export function AuthCheck({ children }: AuthCheckProps) {
  const { user, authInitialized } = useAuth();
  
  // Show nothing while checking auth state
  if (!authInitialized) {
    return null;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}