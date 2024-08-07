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

import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle"; // POR_HACER
import WatchLaterIcon from "@mui/icons-material/WatchLater"; // EN_PROGRESO
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // COMPLETADO
import CancelIcon from "@mui/icons-material/Cancel"; // RECHAZADO

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
      setHeaderColor("#858226");
    } else if (ticket?.estado === Estado.COMPLETADO) {
      setHeaderColor("#0c912b");
    } else {
      setHeaderColor("#8c130a");
    }
  }, [ticket]);

  // Map de iconos basado en el estado
  const estadoIconMap: Record<Estado, ReactElement> = {
    [Estado.POR_HACER]: (
      <SwapHorizontalCircleIcon sx={{ color: headerColor, fontSize: 30 }} />
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
      setPrioridadColor("green");
    } else if (ticket?.prioridad === Prioridad.MEDIA) {
      setPrioridadColor("yellow");
    } else {
      setPrioridadColor("red");
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
                fontSize: "15px"
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
                  <Tooltip title={`Requerimiento: ` + ticket?.requerimiento.descripcion}>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 800,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              {ticket?.titulo}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {ticket?.descripcion}
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Box
              sx={{
                bgcolor: headerColor,
                color: "#fff",
                borderRadius: "16px",
                padding: "4px 8px",
              }}
            >
              <Typography variant="subtitle2">
                Estado: {ticket?.estado}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: prioridadColor,
                color: "#000",
                borderRadius: "16px",
                padding: "4px 8px",
              }}
            >
              <Typography variant="subtitle2">
                Prioridad: {ticket?.prioridad}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "#d3d3d3",
                color: "#000",
                borderRadius: "16px",
                padding: "4px 8px",
              }}
            >
              <Typography variant="subtitle2">
                Requerimiento: {ticket?.requerimiento.descripcion}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TicketUsuario;
