import { useAuth0 } from "@auth0/auth0-react";
import MisTicketsPage from "./MisTicketsPage";
import { useAuth } from "../context/AuthContext";
import Rol from "../types/enums/Rol";
import GerentePage from "./GerentePage";

const DashboardPage: React.FC = () => {
  const { isLoading } = useAuth0();
  const { user } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>{user?.rol === Rol.EMPLEADO ? <MisTicketsPage /> : <GerentePage />}</>
  );
};

export default DashboardPage;
