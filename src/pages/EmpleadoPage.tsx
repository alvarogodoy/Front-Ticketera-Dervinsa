import { Box, Fab, Grid, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TicketDialog from "../components/TicketDialog";
import { useAuth } from "../context/AuthContext";
import Ticket from "../types/Ticket";
import { getTickets } from "../services/TicketService";
import TicketUsuario from "../components/TicketUsuario";
import SortMenu from "../components/SortMenu";
import { sortTickets } from "../utils/Functions";
import AddIcon from "@mui/icons-material/Add";

const EmpleadoPage: React.FC = () => {
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { user } = useAuth();

  const handleSortChange = (sortBy: string) => {
    setSortCriteria(sortBy);
  };

  useEffect(() => {
    const getTicketsDB = async () => {
      let ticketsDB = await getTickets();
      ticketsDB = ticketsDB.filter((ticket) => ticket.eliminado === false);
      ticketsDB = sortTickets(sortCriteria, ticketsDB);
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
        position: "relative", // Añadido para posicionar el FAB correctamente
      }}
    >
      <TicketDialog open={open} onClose={handleClose} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Espacio entre el título y el menú
          alignItems: "center", // Alinear verticalmente al centro
          //marginBottom: 2, // Margen inferior
        }}
      >
        <Typography
          variant="h4"
          sx={{
            maxWidth: "350px", // adjust the max width as necessary
            overflow: "hidden",
            textOverflow: "ellipsis",
            letterSpacing: ".1rem",
            whiteSpace: "nowrap",
            fontFamily: "Segoe UI Symbol",
          }}
        >
          <b>Mis Tickets</b>
        </Typography>
        <SortMenu onSortChange={handleSortChange} />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: 1,
          border: "1px solid #aaa",
          mt: 2,
          padding: 1,
          overflow: "auto",
          scrollbarWidth: "none", // Oculta la barra de desplazamiento en Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Oculta la barra de desplazamiento en Chrome, Safari y Edge
          },
        }}
      >
        <Grid container spacing={2}>
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
              fontSize: "40px",
            }}
          />
        </Tooltip>
      </Fab>
    </Box>
  );
};

export default EmpleadoPage;
