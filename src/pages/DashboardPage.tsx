import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../context/AuthContext";
import Rol from "../types/enums/Rol";
import GerentePage from "./GerentePage";
import EmpleadoPage from "./EmpleadoPage";
import AdminPage from "./AdminPage";

const DashboardPage: React.FC = () => {
  const { isLoading } = useAuth0();
  const { user } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user?.rol === Rol.EMPLEADO ? (
        <EmpleadoPage />
      ) : user?.rol === Rol.GERENTE ? (
        <GerentePage />
      ) : (
        <AdminPage />
      )}
    </>
  );
};

export default DashboardPage;
