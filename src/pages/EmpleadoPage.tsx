import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import TicketDialog from "../components/TicketDialog";
import { useAuth } from "../context/AuthContext";
import Ticket from "../types/Ticket";
import { getTickets } from "../services/TicketService";
import TicketUsuario from "../components/TicketUsuario";

const EmpleadoPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const getTicketsDB = async () => {
      let ticketsDB = await getTickets();
      ticketsDB = ticketsDB.filter((t) => t.usuario.id === user?.id);

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
        <TicketDialog open={open} onClose={handleClose} />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: 3,
          border: "1px solid #aaa",
          mt: 2,
          padding: 2,
          overflow: "auto",
        }}
      >
        <Grid container spacing={3}>
          {tickets.map((ticket) => (
            <TicketUsuario ticket={ticket} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default EmpleadoPage;
