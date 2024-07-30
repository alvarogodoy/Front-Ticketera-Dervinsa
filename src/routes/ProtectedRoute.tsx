import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[]; // Lista de roles permitidos
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  element,
}) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Verificar si el rol del usuario está en la lista de roles permitidos
  const hasRequiredRole = user?.rol && allowedRoles.includes(user.rol);

  if (!isAuthenticated) {
    // Redirige a la página de inicio de sesión o donde corresponda
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!hasRequiredRole) {
    // Redirige a la página de acceso denegado
    return <Navigate to="/access-denied" replace />;
  }

  return element;
};

export default ProtectedRoute;
