import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import TicketDialog from "../components/TicketDialog";
import { useAuth } from "../context/AuthContext";

const MisTicketsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTicketSubmit = (ticket: {
    title: string;
    description: string;
    requirement: string;
  }) => {
    console.log("Nuevo Ticket Creado:", ticket);
  };

  return (
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
        <Button onClick={handleOpen}>Nuevo ticket</Button>
        <TicketDialog
          open={open}
          onClose={handleClose}
          onSubmit={handleTicketSubmit}
        />
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
  );
};

export default MisTicketsPage;
