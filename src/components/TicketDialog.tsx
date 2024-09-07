import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import Ticket from "../types/Ticket";
import Area from "../types/Area";
import { getAreas } from "../services/AreaService";
import Requerimiento from "../types/Requerimiento";
import { getRequerimientos } from "../services/RequerimientoService";
import { useAuth } from "../context/AuthContext";
import { postTicket } from "../services/TicketService";
import Prioridad from "../types/enums/Prioridad";
import CloseIcon from "@mui/icons-material/Close";

interface TicketFormProps {
  onClose: () => void;
  open: boolean;
}

const TicketDialog: React.FC<TicketFormProps> = ({ onClose, open }) => {
  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [areas, setAreas] = useState<Area[]>([]);
  const [area, setArea] = useState<string>("");
  const [requerimientos, setRequerimientos] = useState<Requerimiento[]>([]);
  const [requerimiento, setRequerimiento] = useState<string>("");
  const [prioridad, setPrioridad] = useState<Prioridad>(Prioridad.BAJA);
  const { user } = useAuth();

  useEffect(() => {
    const getAreasDB = async () => {
      let areasDB = await getAreas();
      setAreas(areasDB);
    };

    getAreasDB();
  });

  useEffect(() => {
    const getReqsDB = async () => {
      let reqsDB = await getRequerimientos();
      reqsDB = reqsDB.filter((req) => req.area?.nombre === area);
      setRequerimientos(reqsDB);
    };

    getReqsDB();
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    let req = requerimientos.filter((r) => r.descripcion === requerimiento)[0];

    const newTicket: Ticket = new Ticket();

    if (user) {
      newTicket.usuario = user;
      newTicket.asignado = null; // Asegura que el usuario sea encontrado
      newTicket.titulo = titulo;
      newTicket.descripcion = descripcion;
      newTicket.requerimiento = req;
      newTicket.prioridad = prioridad;
      
    }

    postTicket(newTicket);

    setTitulo("");
    setDescripcion("");
    setRequerimiento("");
    setPrioridad(Prioridad.BAJA);
    onClose();
  };

  // Verifica si el botón de crear ticket debe estar deshabilitado
  const isSubmitDisabled = (): boolean => {
    return (
      !titulo ||
      !descripcion ||
      !area ||
      !requerimiento ||
      requerimientos.length === 0
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{ borderRadius: 3 }}
    >
      <Box
        sx={{
          marginBottom: -2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 1,
        }}
      >
        <DialogTitle>
          <Box sx={{ paddingLeft: 1, marginTop: 2 }}>
            <Typography
              sx={{
                maxWidth: {
                  xs: "180px", // Máximo ancho en pantallas pequeñas (celulares)
                  sm: "50vw", // Máximo ancho en pantallas medianas
                  md: "70vw", // Máximo ancho en pantallas más grandes
                  lg: "80vw", // Máximo ancho en pantallas aún más grandes
                },
                fontSize: 22,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <b>Nuevo Ticket</b>
            </Typography>
          </Box>
        </DialogTitle>
        <IconButton onClick={onClose} sx={{ marginTop: 2, marginRight: 2 }}>
          <CloseIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 1 }}
        >
          <TextField
            label="Título"
            variant="outlined"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <TextField
            label="Descripción"
            variant="outlined"
            multiline
            rows={5}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value.slice(0, 255))}
            inputProps={{ maxLength: 255 }}
            helperText={`${descripcion.length}/255`}
            FormHelperTextProps={{
              sx: {
                textAlign: "right",
                paddingRight: 2,
                width: "100%",
              },
            }}
            required
            sx={{ marginBottom: -2.9 }}
          />

          <FormControl variant="outlined" required>
            <InputLabel id="area-label">Área</InputLabel>
            <Select
              labelId="area-label"
              value={area}
              onChange={(e) => setArea(e.target.value as string)}
              label="Área"
            >
              {areas.map((a) => (
                <MenuItem key={a.nombre} value={a.nombre}>
                  {a.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              gap: 2, // Añade un espacio entre los FormControl
            }}
          >
            <FormControl
              variant="outlined"
              required
              sx={{
                flex: 2, // Asegura que el FormControl ocupe todo el espacio disponible
              }}
            >
              <InputLabel id="requirement-label">Requerimiento</InputLabel>
              <Select
                labelId="requirement-label"
                value={requerimiento}
                onChange={(e) => setRequerimiento(e.target.value as string)}
                label="Requerimiento"
                disabled={requerimientos.length === 0}
              >
                {requerimientos.map((req) => (
                  <MenuItem key={req.descripcion} value={req.descripcion}>
                    {req.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              required
              sx={{
                flex: 1, // Asegura que el FormControl ocupe todo el espacio disponible
              }}
            >
              <InputLabel id="prioridad-label">Prioridad</InputLabel>
              <Select
                labelId="prioridad-label"
                value={prioridad}
                onChange={(e) => setPrioridad(e.target.value as Prioridad)}
                label="Prioridad"
              >
                <MenuItem value={Prioridad.BAJA}>Baja</MenuItem>
                <MenuItem value={Prioridad.MEDIA}>Media</MenuItem>
                <MenuItem value={Prioridad.ALTA}>Alta</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <DialogActions sx={{ padding: 0, paddingTop: 2 }}>
            <Button
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              disabled={isSubmitDisabled()}
            >
              Crear Ticket
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDialog;
