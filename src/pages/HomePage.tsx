import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirige a una ruta protegida si ya está autenticado
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
        textAlign: "center",
        padding: 2,
      }}
    >
      {isAuthenticated ? (
        <Typography variant="h6" color="textPrimary">
          You are already logged in.
        </Typography>
      ) : (
        <>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontFamily: "Segoe UI Symbol",
            }}
          >
            Bienvenido a la Ticketera de
          </Typography>
          <Box sx={{ mb: 4, marginTop: 3 }}>
            <img src="/img/logo1.png" alt="Logo" style={{ width: "300px" }} />
          </Box>
          <Button
            onClick={() => loginWithRedirect()}
            variant="contained"
            color="primary"
            sx={{ mt: 2, padding: "10px 20px" }}
          >
            Login
          </Button>
        </>
      )}
    </Container>
  );
};

export default HomePage;
