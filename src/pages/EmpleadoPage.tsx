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
        <Box
          sx={{
            minWidth: "160px",
          }}
        >
          <SortMenu onSortChange={handleSortChange} />
        </Box>
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
          "&:hover .hover-effect": {
            bgcolor: "#1565C0", // Color más oscuro al pasar el mouse
          },
        }}
        onClick={handleOpen}
      >
        <Tooltip title="Nuevo Ticket">
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              className="hover-effect" // Clase para aplicar el hover
              sx={{
                position: "absolute",
                display: { xs: "flex", md: "none" }, // Solo muestra el texto en pantallas xs
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#1976D2",
                transition: "background-color 0.3s", // Transición suave
                borderRadius: 10,
                height: 40,
                width: 135,
                left: -145, // Ajusta esta distancia para alinear correctamente el texto
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Segoe UI Symbol",
                  color: "white",
                }}
              >
                <b>Nuevo Ticket</b>
              </Typography>
            </Box>
            <AddIcon
              sx={{
                fontSize: "40px",
              }}
            />
          </Box>
        </Tooltip>
      </Fab>
    </Box>
  );
};

export default EmpleadoPage;
