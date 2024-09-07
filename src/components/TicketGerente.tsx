import { Avatar, Box, Grid, Tooltip, Typography } from "@mui/material";
import Ticket from "../types/Ticket";
import { useEffect, useState } from "react";
import Prioridad from "../types/enums/Prioridad";
import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DetalleDialog from "./DetalleDialog";

interface TicketGerenteProps {
  ticket: Ticket | null;
}

const TicketGerente: React.FC<TicketGerenteProps> = ({ ticket }) => {
  const [prioridadColor, setPrioridadColor] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [tiempoDesde, setTiempoDesde] = useState<string>("");

  useEffect(() => {
    if (ticket?.prioridad === Prioridad.BAJA) {
      setPrioridadColor("#3aa1da");
    } else if (ticket?.prioridad === Prioridad.MEDIA) {
      setPrioridadColor("#f3b03b");
    } else {
      setPrioridadColor("#C70039");
    }
  }, [ticket]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function calculateTimeElapsed() {
    let startDate: Date = new Date();
    if (ticket) {
      startDate = new Date(ticket.fechaCreacion);
    }

    const currentDate: Date = new Date();

    const millisecondsInADay: number = 24 * 60 * 60 * 1000;
    const millisecondsInAnHour: number = 60 * 60 * 1000;
    const millisecondsInAMinute: number = 60 * 1000;

    const differenceInMilliseconds: number =
      currentDate.getTime() - startDate.getTime();

    if (differenceInMilliseconds >= millisecondsInADay) {
      const daysElapsed: number = Math.floor(
        differenceInMilliseconds / millisecondsInADay
      );
      setTiempoDesde(`Hace ${daysElapsed} días`);
    } else if (differenceInMilliseconds >= millisecondsInAnHour) {
      const hoursElapsed: number = Math.floor(
        differenceInMilliseconds / millisecondsInAnHour
      );
      setTiempoDesde(`Hace ${hoursElapsed} horas`);
    } else {
      const minutesElapsed: number = Math.floor(
        differenceInMilliseconds / millisecondsInAMinute
      );
      setTiempoDesde(`Hace ${minutesElapsed} minutos`);
    }
  }

  useEffect(() => {
    calculateTimeElapsed();
  });

  return (
    <>
      <Grid item xl={12} onClick={handleOpen}>
        <Box
          sx={{
            bgcolor: "#fff",
            height: 145,
            borderRadius: 1,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            transition: "transform 0.2s",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: 4,
            },
          }}
        >
          <Box
            sx={{
              padding: 1,
              color: "#000",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                maxWidth: "350px", // adjust the max width as necessary
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontFamily: "Segoe UI Symbol",
                marginLeft: 1,
              }}
            >
              <b>{ticket?.titulo}</b>
            </Typography>
          </Box>
          <Box
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: "Segoe UI Symbol",
                fontSize: "15px",
              }}
            >
              {tiempoDesde}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: "auto",
              }}
            >
              <Tooltip title={`Prioridad: ` + ticket?.prioridad}>
                <FiberManualRecordIcon
                  sx={{
                    color: prioridadColor,
                    stroke: "#000", // color del contorno
                    strokeWidth: 1, // grosor del contorno
                    fill: prioridadColor, // color de relleno del ícono
                    filter: "brightness(1.2)", // efecto brillante
                    fontSize: 30, // tamaño del ícono (puedes ajustar el valor según sea necesario)
                    marginLeft: 0,
                    opacity: 0.8, // ajusta este valor para hacer el icono más opaco (0.0 es completamente transparente, 1.0 es completamente opaco)
                  }}
                />
              </Tooltip>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#d3d3d3",
                    color: "#000",
                    borderRadius: "8px",
                    padding: "4px 8px",
                  }}
                >
                  <Tooltip
                    title={
                      `Requerimiento: ` + ticket?.requerimiento.descripcion
                    }
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontFamily: "Segoe UI Symbol",
                      }}
                    >
                      {ticket?.requerimiento.descripcion}
                    </Typography>
                  </Tooltip>
                </Box>
                <Tooltip title={ticket?.usuario.email}>
                  <Avatar
                    src={ticket?.usuario.urlPic}
                    sx={{
                      borderRadius: "4px",
                      ml: 1,
                      width: 28,
                      height: 28,
                      mr: 1,
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>

      {ticket ? (
        <DetalleDialog onClose={handleClose} open={open} ticket={ticket} />
      ) : null}
    </>
  );
};

export default TicketGerente;
