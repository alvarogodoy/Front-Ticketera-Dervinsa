import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import RequerimientoDialog from "../components/RequerimientoDialog";

const GerentePage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReqSubmit = (req: { description: string }) => {
    console.log(user?.area?.nombre);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "#ddd",
          display: "flex",
          padding: 2,
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              width: "60%",
              height: 150,
              bgcolor: "#888",
              borderRadius: 3,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {user?.area?.nombre}
          </Box>
          <Box
            sx={{
              width: "20%",
              height: 150,
              ml: 3,
              bgcolor: "#888",
              borderRadius: 3,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Filtros
          </Box>
          <Box
            sx={{
              width: "10%",
              height: 150,
              ml: 3,
              bgcolor: "#888",
              borderRadius: 3,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button onClick={handleOpen}>Crear requerimiento</Button>
            <RequerimientoDialog
              open={open}
              onClose={handleClose}
              onSubmit={handleReqSubmit}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 3,
            border: "1px solid #aaa",
            mt: 2,
            padding: 1,
            overflow: "auto",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  height: 200,
                  borderRadius: 3,
                  boxShadow: 2,
                }}
              >
                {user?.rol}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default GerentePage;
