import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import Usuario from "../types/Usuario";
import { getUsuarios } from "../services/UsuarioService";
import RowUsuario from "../components/RowUsuario";

const AdminPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

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
          <b>Portal de Gestion</b>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            sx={{
              zoom: "75%",
              marginLeft: 2,
              width: 180,
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
                  <b>ID</b>
                </TableCell>
                <TableCell align="center">
                  <b>Nombre</b>
                </TableCell>
                <TableCell align="center">
                  <b>E-Mail</b>
                </TableCell>
                <TableCell align="center">
                  <b>Area</b>
                </TableCell>
                <TableCell align="center">
                  <b>Rol</b>
                </TableCell>
                <TableCell align="center">
                  <b>Habilitado</b>
                </TableCell>
                <TableCell align="center">
                  <b>Editar</b>
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
    </Box>
  );
};

export default AdminPage;
