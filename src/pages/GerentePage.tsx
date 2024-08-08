import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Ticket from "../types/Ticket";
import { getTickets } from "../services/TicketService";
import ColumnaTickets from "../components/ColumnaTickets";
import Estado from "../types/enums/Estado";
import SortMenu from "../components/SortMenu";
import { sortTickets } from "../utils/Functions";

const GerentePage: React.FC = () => {
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [ticketsPH, setTicketsPH] = useState<Ticket[]>([]);
  const [ticketsEP, setTicketsEP] = useState<Ticket[]>([]);
  const [ticketsC, setTicketsC] = useState<Ticket[]>([]);
  const [ticketsR, setTicketsR] = useState<Ticket[]>([]);
  const { user } = useAuth();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (sortBy: string) => {
    setSortCriteria(sortBy);
  };

  useEffect(() => {
    const getTicketsDB = async () => {
      let ticketsDB = await getTickets();
      ticketsDB = sortTickets(sortCriteria, ticketsDB);
      ticketsDB = ticketsDB.filter((ticket) =>
        ticket.usuario.email?.includes(searchTerm.toLowerCase())
      );

      ticketsDB = ticketsDB.filter(
        (ticket) => ticket.requerimiento.area?.id == user?.area?.id
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
        <Box
          sx={{
            width: "100%",
            height: 90,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 1,
          }}
        >
          <Typography variant="h3" sx={{ fontFamily: "Segoe UI Symbol" }}>
            <b>{user?.area?.nombre}</b>
          </Typography>
          <SortMenu
            onSortChange={handleSortChange}
            sx={{ marginLeft: "auto" }}
          />
          <TextField
            label="Buscar por email"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ marginBottom: 2 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            mt: 1,
          }}
        >
          <Grid container spacing={2} sx={{ height: "100%", width: "100%" }}>
            <Grid item xs={3}>
              <Box
                sx={{
                  bgcolor: "#bbb",
                  height: "100%",
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    padding: 2,
                    height: "10%",
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "Segoe UI Symbol" }}
                  >
                    <b>POR HACER</b>
                  </Typography>
                  <Box
                    sx={{
                      height: 30,
                      width: 50,
                      bgcolor: "#333",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      ml: 3,
                    }}
                  >
                    {ticketsPH.length}
                  </Box>
                </Box>
                <ColumnaTickets tickets={ticketsPH} />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  bgcolor: "#bbb",
                  height: "100%",
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    padding: 2,
                    height: "10%",
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "Segoe UI Symbol" }}
                  >
                    <b>EN PROGRESO</b>
                  </Typography>
                  <Box
                    sx={{
                      height: 30,
                      width: 50,
                      bgcolor: "#333",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      ml: 3,
                    }}
                  >
                    {ticketsEP.length}
                  </Box>
                </Box>
                <ColumnaTickets tickets={ticketsEP} />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  bgcolor: "#bbb",
                  height: "100%",
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    padding: 2,
                    height: "10%",
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "Segoe UI Symbol" }}
                  >
                    <b>COMPLETO</b>
                  </Typography>
                  <Box
                    sx={{
                      height: 30,
                      width: 50,
                      bgcolor: "#333",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      ml: 3,
                    }}
                  >
                    {ticketsC.length}
                  </Box>
                </Box>
                <ColumnaTickets tickets={ticketsC} />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  bgcolor: "#bbb",
                  height: "100%",
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    padding: 2,
                    height: "10%",
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "Segoe UI Symbol" }}
                  >
                    <b>RECHAZADO</b>
                  </Typography>
                  <Box
                    sx={{
                      height: 30,
                      width: 50,
                      bgcolor: "#333",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      ml: 3,
                    }}
                  >
                    {ticketsR.length}
                  </Box>
                </Box>
                <ColumnaTickets tickets={ticketsR} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default GerentePage;
