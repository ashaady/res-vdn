import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole | UserRole[];
}

export default function ProtectedRoute({
  children,
  requiredRoles = ["admin", "manager", "customer"],
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F58220] mx-auto mb-4"></div>
          <p className="text-[#666666] font-lato">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !hasRole(requiredRoles)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F5F5]">
        <div className="text-center">
          <p className="text-2xl mb-2">❌</p>
          <p className="text-[#6B3E26] font-playfair font-bold text-lg">
            Accès refusé
          </p>
          <p className="text-[#666666] font-lato text-sm mt-2">
            Vous n'avez pas les permissions pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
