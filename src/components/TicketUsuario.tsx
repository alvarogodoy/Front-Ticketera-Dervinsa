import {
  Grid,
  Box,
  Typography,
  Modal,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Ticket from "../types/Ticket";
import { ReactElement, useEffect, useState } from "react";
import Estado from "../types/enums/Estado";
import Prioridad from "../types/enums/Prioridad";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import BuildCircleIcon from "@mui/icons-material/BuildCircle"; // POR_HACER
import WatchLaterIcon from "@mui/icons-material/WatchLater"; // EN_PROGRESO
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // COMPLETADO
import CancelIcon from "@mui/icons-material/Cancel"; // RECHAZADO
import DetalleDialog from "./DetalleDialog";

interface TicketUsuarioProps {
  ticket: Ticket | null;
}

const TicketUsuario: React.FC<TicketUsuarioProps> = ({ ticket }) => {
  const [headerColor, setHeaderColor] = useState<string>("");
  const [prioridadColor, setPrioridadColor] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [tiempoDesde, setTiempoDesde] = useState<string>("");

  useEffect(() => {
    if (ticket?.estado === Estado.POR_HACER) {
      setHeaderColor("#2e60b0");
    } else if (ticket?.estado === Estado.EN_PROGRESO) {
      setHeaderColor("#c156bc");
    } else if (ticket?.estado === Estado.COMPLETADO) {
      setHeaderColor("#0c912b");
    } else {
      setHeaderColor("#8c130a");
    }
  }, [ticket]);

  // Map de iconos basado en el estado
  const estadoIconMap: Record<Estado, ReactElement> = {
    [Estado.POR_HACER]: (
      <BuildCircleIcon sx={{ color: headerColor, fontSize: 30 }} />
    ),
    [Estado.EN_PROGRESO]: (
      <WatchLaterIcon sx={{ color: headerColor, fontSize: 30 }} />
    ),
    [Estado.COMPLETADO]: (
      <CheckCircleIcon sx={{ color: headerColor, fontSize: 30 }} />
    ),
    [Estado.RECHAZADO]: (
      <CancelIcon sx={{ color: headerColor, fontSize: 30 }} />
    ),
  };

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

  /*
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  */

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
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} onClick={handleOpen}>
        <Box
          sx={{
            bgcolor: "#fff",
            height: 150,
            borderRadius: 2,
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
              //bgcolor: headerColor,
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
              height: "2px",
              color: "#fff",
              bgcolor: headerColor,
            }}
          />
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
                    borderRadius: "12px",
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
                <Tooltip title={`Estado: ` + ticket?.estado}>
                  {estadoIconMap[ticket?.estado as Estado]}
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
      {ticket ? (
        <DetalleDialog open={open} onClose={handleClose} ticket={ticket} />
      ) : null}
    </>
  );
};

export default TicketUsuario;
