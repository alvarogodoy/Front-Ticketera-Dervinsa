// Layout.tsx
import React from "react";
import { Container, Box } from "@mui/material"; // Asegúrate de tener instalada la librería @mui/material
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: 0,
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default Layout;
