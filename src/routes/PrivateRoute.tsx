import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress, Box } from "@mui/material";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
