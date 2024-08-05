import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import RequerimientoDialog from "../components/RequerimientoDialog";
import Ticket from "../types/Ticket";
import { getTickets } from "../services/TicketService";
import TicketGerente from "../components/TicketGerente";

const GerentePage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const getTicketsDB = async () => {
      let ticketsDB = await getTickets();
      setTickets(ticketsDB);
    };

    getTicketsDB();
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <RequerimientoDialog open={open} onClose={handleClose} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            borderRadius: 3,
            border: "1px solid #aaa",
            mt: 2,
            padding: 1,
          }}
        >
          <Grid container spacing={2} sx={{ height: "100%", width: "100%" }}>
            <Grid item xs={3}>
              <Box
                sx={{
                  border: "1px solid #888",
                  height: "100%",
                  borderRadius: 3,
                }}
              >
                <Box
                  sx={{
                    padding: 2,
                    borderBottom: "1px solid #888",
                    height: "10%",
                  }}
                >
                  <Typography variant="h6">POR HACER</Typography>
                </Box>
                <Box
                  sx={{
                    padding: 2,
                    height: "90%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {tickets.map((ticket) => (
                    <TicketGerente ticket={ticket}></TicketGerente>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{}}></Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{}}></Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{}}></Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default GerentePage;
