import {
  Box,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import Usuario from "../types/Usuario";
import { getUsuarios } from "../services/UsuarioService";
import RowUsuario from "../components/RowUsuario";
import AreaDialog from "../components/AreaDialog";
import AddIcon from "@mui/icons-material/Add";

const AdminPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getUsuariosDB = async () => {
      let usuariosDB = await getUsuarios();
      usuariosDB = usuariosDB.filter(
        (usuario) =>
          usuario.nombre?.includes(searchTerm) ||
          usuario.email?.includes(searchTerm)
      );
      setUsuarios(usuariosDB);
    };

    getUsuariosDB();
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "#ddd",
        display: "flex",
        padding: 2,
        flexDirection: "column",
        position: "relative",
        overflowY: "hidden",
      }}
    >
      <AreaDialog open={open} onClose={handleClose} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            maxWidth: "350px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            letterSpacing: ".1rem",
            whiteSpace: "nowrap",
            fontFamily: "Segoe UI Symbol",
          }}
        >
          <b>Portal de Gestión</b>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            sx={{
              width: { xs: 250, md: 400 }, // Ancho completo solo en pantallas pequeñas
              zoom: "75%",
            }}
            label="Buscar por email"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: 1,
          border: "1px solid #aaa",
          mt: 2,
          padding: 0.5,
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "60vh", // Altura máxima de la tabla, ajusta según sea necesario
            overflowY: "auto", // Permite el scroll vertical
            scrollbarWidth: "thin", // Para navegadores que soportan scrollbarWidth
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                    <b>ID</b>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                    <b>Nombre</b>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                    <b>E-Mail</b>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                    <b>Rol</b>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                    <b>Area</b>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                    <b>Habilitado</b>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                    <b>Editar</b>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <RowUsuario key={usuario.id} usuario={usuario} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Fab
        color="secondary"
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 60,
          right: 48,
          "&:hover .hover-effect": {
            bgcolor: "#7B1FA2", // Color más oscuro al pasar el mouse
          },
        }}
        onClick={handleOpen}
      >
        <Tooltip title="Nueva Area">
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              className="hover-effect" // Clase para aplicar el hover
              sx={{
                position: "absolute",
                display: { xs: "flex", md: "none" }, // Solo muestra el texto en pantallas xs
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#9C27B0",
                transition: "background-color 0.3s", // Transición suave
                borderRadius: 10,
                height: 40,
                width: 120,
                left: -130, // Ajusta esta distancia para alinear correctamente el texto
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: "Segoe UI Symbol",
                  color: "white",
                }}
              >
                <b>Nueva Area</b>
              </Typography>
            </Box>
            <AddIcon
              sx={{
                fontSize: "40px",
              }}
            />
          </Box>
        </Tooltip>
      </Fab>
      
    </Box>
  );
};

export default AdminPage;
