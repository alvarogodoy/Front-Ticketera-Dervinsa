import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
  Fab,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useAuth } from "../context/AuthContext";
import Ticket from "../types/Ticket";
import ColumnaTickets from "../components/ColumnaTickets";
import Estado from "../types/enums/Estado";
import SortMenu from "../components/SortMenu";
import { filterTickets, sortTickets } from "../utils/Functions";
import { getTickets } from "../services/TicketService";
import BuildCircleIcon from "@mui/icons-material/BuildCircle"; // POR_HACER
import WatchLaterIcon from "@mui/icons-material/WatchLater"; // EN_PROGRESO
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // COMPLETADO
import CancelIcon from "@mui/icons-material/Cancel"; // RECHAZADO
import RequerimientoDialog from "../components/RequerimientoDialog";
import AddIcon from "@mui/icons-material/Add";
import TicketDialog from "../components/TicketDialog";
import FilterMenu from "../components/FilterMenu";

const GerentePage: React.FC = () => {
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [filterCriteria, setFilterCriteria] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [ticketsPH, setTicketsPH] = useState<Ticket[]>([]);
  const [ticketsEP, setTicketsEP] = useState<Ticket[]>([]);
  const [ticketsC, setTicketsC] = useState<Ticket[]>([]);
  const [ticketsR, setTicketsR] = useState<Ticket[]>([]);
  const [collapseStates, setCollapseStates] = useState({
    ph: false,
    ep: false,
    c: false,
    r: false,
  });
  const { user } = useAuth();

  const handleCollapse = (key: keyof typeof collapseStates) => {
    setCollapseStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (sortBy: string) => {
    setSortCriteria(sortBy);
  };

  const handleFilterChange = (filterBy: string) => {
    setFilterCriteria(filterBy);
  };

  useEffect(() => {
    const getTicketsDB = async () => {
      let ticketsDB = await getTickets();
      ticketsDB = ticketsDB.filter((ticket) => ticket.eliminado === false);
      ticketsDB = filterTickets(filterCriteria, ticketsDB, user);
      ticketsDB = sortTickets(sortCriteria, ticketsDB);
      ticketsDB = ticketsDB.filter(
        (ticket) =>
          ticket.usuario.email?.includes(searchTerm.toLowerCase()) ||
          ticket.usuario.nombre?.includes(searchTerm.toLowerCase())
      );

      ticketsDB = ticketsDB.filter(
        (ticket) => ticket.requerimiento.area?.id === user?.area?.id
      );

      setTicketsPH(
        ticketsDB.filter((ticket) => ticket.estado === Estado.POR_HACER)
      );
      setTicketsEP(
        ticketsDB.filter((ticket) => ticket.estado === Estado.EN_PROGRESO)
      );
      setTicketsC(
        ticketsDB.filter((ticket) => ticket.estado === Estado.COMPLETADO)
      );
      setTicketsR(
        ticketsDB.filter((ticket) => ticket.estado === Estado.RECHAZADO)
      );
    };

    getTicketsDB();
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenTicket = () => {
    setOpenTicket(true);
  };

  const handleCloseTicket = () => {
    setOpenTicket(false);
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
        position: "relative",
      }}
    >
      <RequerimientoDialog open={open} onClose={handleClose} />
      <TicketDialog open={openTicket} onClose={handleCloseTicket} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Cambia de columna a fila según el tamaño de pantalla
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-end", md: "flex-end" },
            justifyContent: "space-between",
            width: "100%", // Ocupa el ancho completo para distribuir el espacio
          }}
        >
          <Typography
            variant="h4"
            sx={{
              maxWidth: "350px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              letterSpacing: ".1rem",
              whiteSpace: "nowrap",
              fontFamily: "Segoe UI Symbol",
            }}
          >
            <b>{user?.area?.nombre}</b>
          </Typography>
          <TextField
            sx={{
              width: { xs: 250, md: 400 }, // Ancho completo solo en pantallas pequeñas
              zoom: "75%",
            }}
            label="Buscar por email"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end", // Alinea verticalmente en pantallas más grandes
            justifyContent: "flex-end", // Alinea los elementos al final (lado derecho)
            gap: 2, // Espacio entre FilterMenu y SortMenu
            minWidth: "310px",
            mt: { xs: 2, md: 0 }, // Margen superior solo en pantallas pequeñas
          }}
        >
          <FilterMenu onFilterChange={handleFilterChange} />
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
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                bgcolor: "#bbb",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onClick={() => handleCollapse("ph")}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Segoe UI Symbol",
                    maxWidth: "250px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginLeft: 2,
                  }}
                >
                  <b>POR HACER</b>
                </Typography>
                <BuildCircleIcon
                  sx={{
                    fontSize: 32, // tamaño del ícono (puedes ajustar el valor según sea necesario)
                    marginLeft: 1,
                    marginRight: 1,
                    opacity: 0.8, // ajusta este valor para hacer el icono más opaco (0.0 es completamente transparente, 1.0 es completamente opaco)
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                    justifyContent: "flex-end", // Alinea los elementos al final
                  }}
                >
                  <Box
                    sx={{
                      height: 24,
                      width: 40,
                      bgcolor: "#333",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      marginRight: 1, // Ajusta el margen si es necesario
                    }}
                  >
                    {ticketsPH.length}
                  </Box>
                  <IconButton size="small">
                    {collapseStates.ph ? (
                      <ExpandMoreIcon />
                    ) : (
                      <ExpandLessIcon />
                    )}
                  </IconButton>
                </Box>
              </Box>
              {!collapseStates.ph && <ColumnaTickets tickets={ticketsPH} />}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                bgcolor: "#bbb",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onClick={() => handleCollapse("ep")}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Segoe UI Symbol",
                    maxWidth: "250px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginLeft: 2,
                  }}
                >
                  <b>EN PROGRESO</b>
                </Typography>
                <WatchLaterIcon
                  sx={{
                    fontSize: 32, // tamaño del ícono (puedes ajustar el valor según sea necesario)
                    marginLeft: 1,
                    marginRight: 1,
                    opacity: 0.8, // ajusta este valor para hacer el icono más opaco (0.0 es completamente transparente, 1.0 es completamente opaco)
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      height: 24,
                      width: 40,
                      bgcolor: "#333",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      marginRight: 1,
                    }}
                  >
                    {ticketsEP.length}
                  </Box>
                  <IconButton size="small">
                    {collapseStates.ep ? (
                      <ExpandMoreIcon />
                    ) : (
                      <ExpandLessIcon />
                    )}
                  </IconButton>
                </Box>
              </Box>
              {!collapseStates.ep && <ColumnaTickets tickets={ticketsEP} />}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                bgcolor: "#bbb",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onClick={() => handleCollapse("c")}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Segoe UI Symbol",
                    maxWidth: "250px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginLeft: 2,
                  }}
                >
                  <b>COMPLETADO</b>
                </Typography>
                <CheckCircleIcon
                  sx={{
                    fontSize: 32, // tamaño del ícono (puedes ajustar el valor según sea necesario)
                    marginLeft: 1,
                    marginRight: 1,
                    opacity: 0.8, // ajusta este valor para hacer el icono más opaco (0.0 es completamente transparente, 1.0 es completamente opaco)
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      height: 24,
                      width: 40,
                      bgcolor: "#333",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      marginRight: 1,
                    }}
                  >
                    {ticketsC.length}
                  </Box>
                  <IconButton size="small">
                    {collapseStates.c ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </IconButton>
                </Box>
              </Box>
              {!collapseStates.c && <ColumnaTickets tickets={ticketsC} />}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                bgcolor: "#bbb",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  padding: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onClick={() => handleCollapse("r")}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Segoe UI Symbol",
                    maxWidth: "250px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginLeft: 2,
                  }}
                >
                  <b>RECHAZADO</b>
                </Typography>
                <CancelIcon
                  sx={{
                    fontSize: 32, // tamaño del ícono (puedes ajustar el valor según sea necesario)
                    marginLeft: 1,
                    marginRight: 1,
                    opacity: 0.8, // ajusta este valor para hacer el icono más opaco (0.0 es completamente transparente, 1.0 es completamente opaco)
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      height: 24,
                      width: 40,
                      bgcolor: "#333",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      marginRight: 1,
                    }}
                  >
                    {ticketsR.length}
                  </Box>
                  <IconButton size="small">
                    {collapseStates.r ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  </IconButton>
                </Box>
              </Box>
              {!collapseStates.r && <ColumnaTickets tickets={ticketsR} />}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Fab
        color="success"
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 130,
          right: 48,
          "&:hover .hover-effect": {
            bgcolor: "#1B5E20", // Color más oscuro al pasar el mouse
          },
        }}
        onClick={handleOpen}
      >
        <Tooltip title="Nuevo Requerimiento">
          <Box
            sx={{
              display: "flex",
              alignItems: "center", // Alinea verticalmente el texto y el ícono
            }}
          >
            <Box
              className="hover-effect" // Clase para aplicar el hover
              sx={{
                position: "absolute",
                display: { xs: "flex", md: "none" }, // Solo muestra el texto en pantallas xs
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#2E7D32", // Color de fondo inicial
                transition: "background-color 0.3s", // Transición suave
                borderRadius: 10,
                height: 40,
                width: 210,
                left: -220, // Ajusta esta distancia para alinear correctamente el texto
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Segoe UI Symbol",
                  color: "white",
                }}
              >
                <b>Nuevo Requerimiento</b>
              </Typography>
            </Box>
            <AddIcon
              sx={{
                fontSize: "40px",
                color: "white",
              }}
            />
          </Box>
        </Tooltip>
      </Fab>

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
        onClick={handleOpenTicket}
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

export default GerentePage;
