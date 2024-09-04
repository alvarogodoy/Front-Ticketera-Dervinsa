import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Area from "../types/Area";
import { postArea } from "../services/AreaService";

interface AreaFormProps {
  onClose: () => void;
  open: boolean;
}

const AreaDialog: React.FC<AreaFormProps> = ({ onClose, open }) => {
  const [nombre, setNombre] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArea: Area = new Area();
    newArea.nombre = nombre;
    postArea(newArea);
    setNombre("");
    onClose();
  };

  // Verifica si el botón de crear ticket debe estar deshabilitado
  const isSubmitDisabled = (): boolean => {
    return !nombre;
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
                  sm: "50vw",  // Máximo ancho en pantallas medianas
                  md: "70vw",  // Máximo ancho en pantallas más grandes
                  lg: "80vw",  // Máximo ancho en pantallas aún más grandes
                },
                fontSize: 22,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <b>Nueva Area</b>
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
          sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 1 }}
        >
          <TextField
            label="Descripción"
            variant="outlined"
            multiline
            rows={1}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <DialogActions sx={{ padding: 0, paddingTop: 2 }}>
            <Button
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              disabled={isSubmitDisabled()}
            >
              Crear Area
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AreaDialog;
