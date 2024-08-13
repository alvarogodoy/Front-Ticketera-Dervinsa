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
        display: "flex",
        padding: 3,
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            maxWidth: "400px",
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
              mt: 3,
              zoom: "75%",
              width: 230,
            }}
            label="Buscar usuario"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>E-Mail</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Deshabilitar/ Habilitar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <RowUsuario usuario={usuario} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminPage;
