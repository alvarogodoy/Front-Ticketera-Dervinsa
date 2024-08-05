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
} from "@mui/material";
import Ticket from "../types/Ticket";
import Area from "../types/Area";
import { getAreas } from "../services/AreaService";
import Requerimiento from "../types/Requerimiento";
import { getRequerimientos } from "../services/RequerimientoService";
import { useAuth } from "../context/AuthContext";
import { postTicket } from "../services/TicketService";
import Prioridad from "../types/enums/Prioridad";

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
      console.log(reqsDB);

      setRequerimientos(reqsDB);
    };

    getReqsDB();
  }, [area]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let req = requerimientos.filter((r) => r.descripcion == requerimiento)[0];

    const newTicket: Ticket = new Ticket();

    if (user) {
      newTicket.usuario = user;
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{ borderRadius: 3 }}
    >
      <DialogTitle>Crear Ticket</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 1 }}
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
            rows={4}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
          <FormControl variant="outlined" required>
            <InputLabel id="area-label">Area</InputLabel>
            <Select
              labelId="area-label"
              value={area}
              onChange={(e) => setArea(e.target.value as string)}
              label="Area"
            >
              {areas.map((a) => (
                <MenuItem value={a.nombre}>{a.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" required>
            <InputLabel id="requirement-label">Requerimiento</InputLabel>
            <Select
              labelId="requirement-label"
              value={requerimiento}
              onChange={(e) => setRequerimiento(e.target.value as string)}
              label="Requerimiento"
            >
              {requerimientos.map((req) => (
                <MenuItem value={req.descripcion}>{req.descripcion}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" required>
            <InputLabel id="requirement-label">Prioridad</InputLabel>
            <Select
              labelId="requirement-label"
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value as Prioridad)}
              label="Requerimiento"
            >
              <MenuItem value={Prioridad.BAJA}>Baja</MenuItem>
              <MenuItem value={Prioridad.MEDIA}>Media</MenuItem>
              <MenuItem value={Prioridad.ALTA}>Alta</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Crear Ticket
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketDialog;
