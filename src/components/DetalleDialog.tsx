import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Ticket from "../types/Ticket";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import Prioridad from "../types/enums/Prioridad";
import Estado from "../types/enums/Estado";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { updateTicket } from "../services/TicketService";
import Rol from "../types/enums/Rol";
import { useAuth } from "../context/AuthContext";

interface DetalleDialogProps {
  onClose: () => void;
  open: boolean;
  ticket: Ticket;
}

const DetalleDialog: React.FC<DetalleDialogProps> = ({
  open,
  onClose,
  ticket,
}) => {
  const [prioridadColor, setPrioridadColor] = useState<string>("");
  const { user } = useAuth();

  const handleEstadoChange = async (event: SelectChangeEvent) => {
    let newEstado = event.target.value as Estado;

    let updatedTicket = ticket;

    if (ticket) {
      ticket.estado = newEstado;
      updatedTicket = await updateTicket(ticket);
    }
    ticket = updatedTicket;
    onClose();
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

  return (
    <Modal
      open={open}
      onClose={onClose}
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
          maxWidth: 500,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ fontFamily: "Segoe UI Symbol" }}
          >
            <b>{ticket?.titulo}</b>
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {user?.rol === Rol.GERENTE ? (
          <FormControl variant="filled" required>
            <Select
              value={ticket.estado}
              onChange={handleEstadoChange}
              sx={{ width: 160, height: 50 }}
            >
              <MenuItem value={Estado.POR_HACER}>
                <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                  <b>POR HACER</b>
                </Typography>
              </MenuItem>
              <MenuItem value={Estado.EN_PROGRESO}>
                <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                  <b>EN PROGRESO</b>
                </Typography>
              </MenuItem>
              <MenuItem value={Estado.COMPLETADO}>
                <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                  <b>COMPLETADO</b>
                </Typography>
              </MenuItem>
              <MenuItem value={Estado.RECHAZADO}>
                <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                  <b>RECHAZADO</b>
                </Typography>
              </MenuItem>
            </Select>
          </FormControl>
        ) : null}

        <Typography variant="subtitle1" sx={{ fontFamily: "Segoe UI Symbol" }}>
          <b>Detalles</b>
        </Typography>
        <Box p={2}>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "Segoe UI Symbol",
              display: "flex",
              alignItems: "center",
            }}
          >
            Usuario:
            <Avatar
              sx={{ ml: 1, width: 30, height: 30, mr: 1 }}
              src={ticket.usuario.urlPic}
            />
            {ticket.usuario.email}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "Segoe UI Symbol",
              display: "flex",
              alignItems: "center",
            }}
          >
            Prioridad:
            <FiberManualRecordIcon
              sx={{
                color: prioridadColor,
                stroke: "#000", // color del contorno
                strokeWidth: 1, // grosor del contorno
                fill: prioridadColor, // color de relleno del ícono
                filter: "brightness(1.2)", // efecto brillante
                fontSize: 30, // tamaño del ícono (puedes ajustar el valor según sea necesario)
                marginLeft: 1,
                mr: 1,
              }}
            />
            {ticket.prioridad}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "Segoe UI Symbol",
              display: "flex",
              alignItems: "center",
            }}
          >
            Requerimiento:
            <Box
              sx={{
                bgcolor: "#d3d3d3",
                color: "#000",
                borderRadius: "16px",
                padding: "4px 8px",
                ml: 1,
              }}
            >
              {ticket.requerimiento.descripcion}
            </Box>
          </Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ fontFamily: "Segoe UI Symbol" }}>
          <b>Descripción</b>
        </Typography>
        <Typography variant="subtitle1" sx={{ fontFamily: "Segoe UI Symbol" }}>
          {ticket.descripcion}
        </Typography>
      </Box>
    </Modal>
  );
};

export default DetalleDialog;
