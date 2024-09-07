import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  InputLabel,
  Divider,
} from "@mui/material";
import Ticket from "../types/Ticket";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import Prioridad from "../types/enums/Prioridad";
import Estado from "../types/enums/Estado";
import { updateTicket } from "../services/TicketService";
import Rol from "../types/enums/Rol";
import { useAuth } from "../context/AuthContext";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DeleteIcon from "@mui/icons-material/Delete";
import Usuario from "../types/Usuario";
import { getUsuarioByEmail, getUsuarios } from "../services/UsuarioService";
import SistemaComentarios from "./SistemaComentarios";

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
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [usuariosArea, setUsuariosArea] = useState<Usuario[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsersArea = async () => {
      let usersArea = await getUsuarios();
      usersArea = usersArea.filter(
        (u) => u.area?.nombre === user?.area?.nombre
      );

      setUsuariosArea(usersArea);
    };

    fetchUsersArea();
  });

  const handleAsignadoChange = async (event: SelectChangeEvent) => {
    let newAsignado = event.target.value as string;
    let asignadoFromDb = null;

    if (newAsignado === "Sin Asignar") {
      asignadoFromDb = null;
    } else {
      asignadoFromDb = await getUsuarioByEmail(newAsignado);
    }

    let updatedTicket = ticket;

    if (ticket) {
      ticket.asignado = asignadoFromDb;

      updatedTicket = await updateTicket(ticket);
    }
    ticket = updatedTicket;
  };

  const handleEstadoChange = async (event: SelectChangeEvent) => {
    let newEstado = event.target.value as Estado;

    let updatedTicket = ticket;

    if (ticket) {
      if (newEstado === Estado.COMPLETADO || newEstado === Estado.RECHAZADO) {
        ticket.fechaCierre = new Date().toISOString();
      }
      ticket.estado = newEstado;
      updatedTicket = await updateTicket(ticket);
    }
    ticket = updatedTicket;
    onClose();
  };

  const handleDeleteTicket = async () => {
    if (ticket) {
      ticket.eliminado = true; // Cambia el estado a eliminado
      await updateTicket(ticket); // Actualiza el ticket en el servidor
      onClose(); // Cierra el diálogo
    }
  };

  const handleOpenConfirmDialog = () => {
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    await handleDeleteTicket();
    setConfirmDialogOpen(false);
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

  return (
    <>
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
            width: "90%",
            maxWidth: 800,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 2,
            display: "flex",
            flexDirection: "column",
            zoom: { xs: "80%", md: "100%" },
            overflowY: "scroll", // Habilitar scroll
            maxHeight: "80vh", // Limitar alto del modal
            scrollbarWidth: "none", // Firefox: Ocultar scrollbar
            "&::-webkit-scrollbar": {
              display: "none", // Chrome/Safari: Ocultar scrollbar
            },
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
              variant="h5"
              component="h2"
              sx={{
                fontFamily: "Segoe UI Symbol",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <b>{ticket?.titulo}</b>
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          {user?.rol === Rol.GERENTE ? (
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: "Segoe UI Symbol",
                display: "flex",
                alignItems: "center",
                marginBottom: 1,
              }}
            >
              <FormControl variant="standard" required sx={{ marginTop: 1 }}>
                <InputLabel id="select-label">Cambiar Estado</InputLabel>
                <Select
                  value={ticket.estado}
                  onChange={handleEstadoChange}
                  sx={{
                    width: 160,
                    height: 40,
                  }}
                >
                  <MenuItem
                    value={Estado.POR_HACER}
                    sx={{
                      zoom: { xs: "80%", md: "100%" },
                    }}
                  >
                    <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                      <b>POR HACER</b>
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    value={Estado.EN_PROGRESO}
                    sx={{
                      zoom: { xs: "80%", md: "100%" },
                    }}
                  >
                    <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                      <b>EN PROGRESO</b>
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    value={Estado.COMPLETADO}
                    sx={{
                      zoom: { xs: "80%", md: "100%" },
                    }}
                  >
                    <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                      <b>COMPLETADO</b>
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    value={Estado.RECHAZADO}
                    sx={{
                      zoom: { xs: "80%", md: "100%" },
                    }}
                  >
                    <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                      <b>RECHAZADO</b>
                    </Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Typography>
          ) : null}

          <Box
            sx={{
              maxWidth: 800,
              display: "flex",
              flexDirection: { xs: "column", sm: "row", md: "row" },
              marginTop: 2,
            }}
          >
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  letterSpacing: ".1rem",
                  fontFamily: "Segoe UI Symbol",
                }}
              >
                <b>Descripción</b>
              </Typography>
              <Box p={2} sx={{ overflow: "auto" }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "Segoe UI Symbol",
                    display: "flex",
                    alignItems: "center",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {ticket.descripcion}
                </Typography>
              </Box>
            </Box>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                marginLeft: "10px",
                marginRight: "10px",
              }}
            />
            <Box
              sx={{
                minWidth: 400,
                flex: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  letterSpacing: ".1rem",
                  fontFamily: "Segoe UI Symbol",
                }}
              >
                <b>Detalles</b>
              </Typography>
              <Box p={2}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "Segoe UI Symbol",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  Reportado por:
                  <Box
                    sx={{
                      marginLeft: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        marginLeft: 1,
                        borderRadius: "4px",
                        ml: 1,
                        width: 24,
                        height: 24,
                        mr: 1,
                      }}
                      src={ticket.usuario.urlPic}
                    />
                    <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                      {ticket.usuario.nombre}
                    </Typography>
                  </Box>
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "Segoe UI Symbol",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  Asignado a:
                  <FormControl
                    variant="standard"
                    required
                    sx={{ marginLeft: 1 }}
                  >
                    <Select
                      value={
                        ticket.asignado ? ticket.asignado.email : "Sin Asignar"
                      }
                      onChange={handleAsignadoChange}
                      sx={{ width: 230, height: 40 }}
                    >
                      <MenuItem
                        value={"Sin Asignar"}
                        sx={{
                          zoom: { xs: "80%", md: "100%" },
                        }}
                      >
                        <Typography
                          sx={{ ml: 1, fontFamily: "Segoe UI Symbol" }}
                        >
                          Sin Asignar
                        </Typography>
                      </MenuItem>
                      {usuariosArea.map((u) => (
                        <MenuItem
                          value={u.email}
                          sx={{
                            zoom: { xs: "80%", md: "100%" },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              sx={{
                                borderRadius: "4px",
                                ml: 1,
                                width: 24,
                                height: 24,
                                mr: 1,
                              }}
                              src={u.urlPic}
                            />
                            <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                              {u.nombre}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "Segoe UI Symbol",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  Prioridad:
                  <FiberManualRecordIcon
                    sx={{
                      color: prioridadColor,
                      stroke: "#000",
                      strokeWidth: 1,
                      fill: prioridadColor,
                      filter: "brightness(1.2)",
                      fontSize: 30,
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
                      borderRadius: "8px",
                      padding: "4px 8px",
                      ml: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ticket.requerimiento.descripcion}
                  </Box>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 1.3,
                    marginBottom: -1.1,
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column", // Alinea los textos en columna
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: "Segoe UI Symbol",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Reporte: {formatDate(ticket.fechaCreacion)}
                    </Typography>

                    {ticket.estado === Estado.COMPLETADO ||
                    ticket.estado === Estado.RECHAZADO ? (
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontFamily: "Segoe UI Symbol",
                          marginTop: 1.6,
                          marginBottom: 2,
                        }}
                      >
                        Cierre: {formatDate(ticket.fechaCierre)}
                      </Typography>
                    ) : null}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column", // Alinea los textos en columna
                      justifyContent: "flex-end",
                      alignItems: "end",
                    }}
                  >
                    <Tooltip title={"Eliminar Ticket"}>
                      <IconButton onClick={handleOpenConfirmDialog}>
                        <DeleteIcon
                          sx={{
                            strokeWidth: 1,
                            fontSize: 30,
                            color: "#f96464",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider></Divider>
          <SistemaComentarios ticket={ticket} />
        </Box>
      </Modal>

      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            ¿Estás seguro de que deseas eliminar este ticket? Esta acción no se
            puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetalleDialog;
