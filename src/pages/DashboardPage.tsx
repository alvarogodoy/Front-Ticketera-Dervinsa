import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../context/AuthContext";
import Rol from "../types/enums/Rol";
import GerentePage from "./GerentePage";
import AdminPage from "./AdminPage";
import { Box, CircularProgress, Typography } from "@mui/material";
import DefaultPage from "./DefaultPage";

const DashboardPage: React.FC = () => {
  const { isLoading } = useAuth0();
  const { user } = useAuth();

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f5f5f5",
        }}
      >
        <CircularProgress />
        <Typography
          variant="h6"
          sx={{
            marginLeft: 2,
            fontFamily: "Segoe UI Symbol",
          }}
        >
          Cargando...
        </Typography>
      </Box>
    );
  }

  if (user?.rol === Rol.ADMIN) {
    return <AdminPage />;
  }

  // Si el usuario es EMPLEADO o GERENTE, mostrar ambas páginas
  return (
    <>
      <GerentePage />
    </>
  );
};

export default DashboardPage;
