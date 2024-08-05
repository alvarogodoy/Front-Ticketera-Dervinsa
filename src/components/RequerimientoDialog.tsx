import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";
import Requerimiento from "../types/Requerimiento";
import { useAuth } from "../context/AuthContext";
import { postRequerimiento } from "../services/RequerimientoService";

interface RequerimientoFormProps {
  onClose: () => void;
  open: boolean;
}

const RequerimientoDialog: React.FC<RequerimientoFormProps> = ({
  onClose,
  open,
}) => {
  const [descripcion, setDescripcion] = useState<string>("");
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: Requerimiento = new Requerimiento();
    newReq.descripcion = descripcion;
    newReq.area = user?.area;
    postRequerimiento(newReq);
    setDescripcion("");
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
      <DialogTitle>Crear Requerimiento</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 1 }}
        >
          <TextField
            label="Descripción"
            variant="outlined"
            multiline
            rows={1}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Crear Requerimiento
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequerimientoDialog;
