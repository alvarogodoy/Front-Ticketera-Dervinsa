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
          justifyContent: "space-between",
          alignItems: "center",
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

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FilterMenu onFilterChange={handleFilterChange} />
          <SortMenu onSortChange={handleSortChange} />
          <TextField
            sx={{
              zoom: "75%",
              marginLeft: 2,
              width: 180,
            }}
            label="Buscar por email"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
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
        }}
        onClick={handleOpen}
      >
        <Tooltip title="Nuevo Requerimiento">
          <AddIcon
            sx={{
              fontSize: "40px",
            }}
          />
        </Tooltip>
      </Fab>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 60,
          right: 48,
        }}
        onClick={handleOpenTicket}
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

export default GerentePage;
