import React, { useState } from "react";
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

interface TicketFormProps {
  onSubmit: (ticket: Ticket) => void;
  onClose: () => void;
  open: boolean;
}

interface Ticket {
  title: string;
  description: string;
  requirement: string;
}

const TicketDialog: React.FC<TicketFormProps> = ({
  onSubmit,
  onClose,
  open,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [requirement, setRequirement] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: Ticket = { title, description, requirement };
    onSubmit(newTicket);
    setTitle("");
    setDescription("");
    setRequirement("");
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Descripción"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <FormControl variant="outlined" required>
            <InputLabel id="requirement-label">Requerimiento</InputLabel>
            <Select
              labelId="requirement-label"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value as string)}
              label="Requerimiento"
            >
              <MenuItem value="" disabled>
                Seleccionar
              </MenuItem>
              <MenuItem value="bug">Bug</MenuItem>
              <MenuItem value="feature">Feature</MenuItem>
              <MenuItem value="support">Support</MenuItem>
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
