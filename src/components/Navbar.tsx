import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Button } from "@mui/material";
import React from "react";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth0();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box
      sx={{
        backgroundColor: "#191919",
        height: 80,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 2,
      }}
    >
      {isAuthenticated ? (
        <>
          <Button onClick={handleLogout}>Cerrar Sesion</Button>
          <Avatar
            sx={{ width: 45, height: 45 }}
            variant="rounded"
            src={user?.picture}
          ></Avatar>
        </>
      ) : null}
    </Box>
  );
};

export default Navbar;
