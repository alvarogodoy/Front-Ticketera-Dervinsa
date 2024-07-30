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

interface RequerimientoFormProps {
  onSubmit: (requerimiento: Requerimiento) => void;
  onClose: () => void;
  open: boolean;
}

interface Requerimiento {
  description: string;
}

const RequerimientoDialog: React.FC<RequerimientoFormProps> = ({
  onSubmit,
  onClose,
  open,
}) => {
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: Requerimiento = { description };
    onSubmit(newTicket);
    setDescription("");
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
