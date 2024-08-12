import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Usuario from "../types/Usuario";
import { useState } from "react";
import Rol from "../types/enums/Rol";
import { updateUsuario } from "../services/UsuarioService";

interface RowUsuarioProps {
  usuario: Usuario;
}

const RowUsuario: React.FC<RowUsuarioProps> = ({ usuario }) => {
  const [rol, setRol] = useState<Rol>(usuario.rol);
  const [habilitado, setHabilitado] = useState<boolean>(!usuario.eliminado);
  const [tempHabilitado, setTempHabilitado] = useState<boolean>(habilitado);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeHabilitado = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!habilitado && !event.target.checked) {
      // Si ya está deshabilitado y el usuario quiere desmarcar el checkbox, solo lo cambia
      setHabilitado(event.target.checked);
    } else if (habilitado && !event.target.checked) {
      // Si está habilitado y el usuario quiere desmarcarlo, pide confirmación
      setTempHabilitado(event.target.checked);
      handleClickOpen();
    } else {
      // Si quiere habilitarlo, lo cambia directamente
      setHabilitado(event.target.checked);
    }
  };

  const handleConfirmDisable = async () => {
    setHabilitado(tempHabilitado);
    handleClose();
    // Aquí puedes realizar alguna acción adicional si es necesario, como una llamada al backend
  };

  const handleRolChange = async (event: SelectChangeEvent) => {
    let newRol = event.target.value as Rol;
    let updatedUser = usuario;

    if (usuario) {
      usuario.rol = newRol;
      updatedUser = await updateUsuario(usuario);
    }
    usuario = updatedUser;
    setRol(usuario.rol);
  };

  return (
    <TableRow>
      <TableCell>{usuario.id}</TableCell>
      <TableCell>{usuario.nombre}</TableCell>
      <TableCell>{usuario.email}</TableCell>
      <TableCell>
        {usuario.area != null ? usuario.area.nombre : "Sin area"}
      </TableCell>
      <TableCell>
        <FormControl variant="standard" required sx={{ marginTop: 1 }}>
          <Select
            value={rol}
            onChange={handleRolChange}
            sx={{ width: 160, height: 40 }}
          >
            <MenuItem value={Rol.ADMIN}>
              <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                <b>Administrador</b>
              </Typography>
            </MenuItem>
            <MenuItem value={Rol.GERENTE}>
              <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                <b>Gerente</b>
              </Typography>
            </MenuItem>
            <MenuItem value={Rol.EMPLEADO}>
              <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                <b>Empleado</b>
              </Typography>
            </MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell>
        <FormControlLabel
          control={
            <Checkbox
              checked={habilitado}
              onChange={handleChangeHabilitado}
              name="checked"
              color="primary"
            />
          }
          label=""
        />
      </TableCell>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Está seguro que desea deshabilitar este usuario?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tanto el usuario como sus tickets permanecerán invisibles mientras
            esté deshabilitado.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDisable} autoFocus>
            Sí
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
};

export default RowUsuario;
