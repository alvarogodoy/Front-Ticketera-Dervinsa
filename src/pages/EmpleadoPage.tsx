import { Box, Fab, Grid, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
  }, [user?.id]);

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
        position: "relative", // Añadido para posicionar el FAB correctamente
      }}
    >
      <TicketDialog open={open} onClose={handleClose} />
      <Typography
        variant="h4"
        sx={{
          maxWidth: "350px", // adjust the max width as necessary
          overflow: "hidden",
          textOverflow: "ellipsis",
          letterSpacing: ".2rem",
          whiteSpace: "nowrap",
          fontFamily: "Segoe UI Symbol",
          marginLeft: 1,
        }}
      >
        <b>MIS TICKETS:</b>
      </Typography>
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
            <TicketUsuario key={ticket.id} ticket={ticket} />
          ))}
        </Grid>
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 60,
          right: 48,
        }}
        onClick={handleOpen}
      >
        <Tooltip title="Nuevo Ticket">
          <AddIcon
            sx={{
              fontSize: "40px"
            }}
          />
        </Tooltip>
      </Fab>
    </Box>
  );
};

export default EmpleadoPage;
