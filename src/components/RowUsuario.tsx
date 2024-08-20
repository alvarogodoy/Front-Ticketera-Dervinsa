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
import { useEffect, useState } from "react";
import Rol from "../types/enums/Rol";
import { updateUsuario } from "../services/UsuarioService";
import Area from "../types/Area";
import { getAreas } from "../services/AreaService";
import { useAuth } from "../context/AuthContext";

interface RowUsuarioProps {
  usuario: Usuario;
}

const RowUsuario: React.FC<RowUsuarioProps> = ({ usuario }) => {
  const { user } = useAuth();
  const [area, setArea] = useState<string | undefined>(usuario.area?.nombre);
  const [areas, setAreas] = useState<Area[]>([]);
  const [rol, setRol] = useState<Rol>(usuario.rol);
  const [habilitado, setHabilitado] = useState<boolean>(!usuario.eliminado);
  const [tempHabilitado, setTempHabilitado] = useState<boolean>(habilitado);
  const [open, setOpen] = useState(false);
  const [editar, setEditar] = useState(false);
  const [openConfirmSave, setOpenConfirmSave] = useState(false); // Estado para el diálogo de confirmación de guardar

  useEffect(() => {
    const getAreasDB = async () => {
      let areasDB = await getAreas();
      setAreas(areasDB);
    };

    getAreasDB();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditar = () => {
    setEditar(true);
  };

  const handleGuardar = () => {
    if (rol === Rol.GERENTE && !area) {
      alert(
        "Debe seleccionar un área para el rol de Gerente antes de guardar los cambios."
      );
    } else {
      setOpenConfirmSave(true); // Abrir diálogo de confirmación
    }
  };
  const handleConfirmSave = () => {
    let unableSelf = false;
    let adminSelfChange = false;

    if (
      usuario.rol === Rol.ADMIN &&
      rol !== Rol.ADMIN &&
      usuario.id === user?.id
    ) {
      adminSelfChange = true;
    }

    if (usuario.id === user?.id && habilitado === false) {
      unableSelf = true;
    }

    usuario.rol = rol;
    usuario.area = areas.find((a) => a.nombre === area);
    usuario.eliminado = !habilitado;

    updateUsuario(usuario);

    setEditar(false);
    setOpenConfirmSave(false);

    if (adminSelfChange || unableSelf) window.location.reload();
  };

  const handleCancelSave = () => {
    setOpenConfirmSave(false); // Cerrar diálogo sin guardar
  };

  const handleAreaChange = async (event: SelectChangeEvent) => {
    let newAreaStr = event.target.value as string;
    setArea(newAreaStr);
  };

  const handleChangeHabilitado = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!habilitado && !event.target.checked) {
      setHabilitado(event.target.checked);
    } else if (habilitado && !event.target.checked) {
      setTempHabilitado(event.target.checked);
      handleClickOpen();
    } else {
      setHabilitado(event.target.checked);
    }
  };

  const handleConfirmDisable = async () => {
    setHabilitado(tempHabilitado);
    handleClose();
  };

  const handleRolChange = async (event: SelectChangeEvent) => {
    let newRol = event.target.value as Rol;
    if (newRol !== Rol.GERENTE) {
      setArea(undefined);
    }

    setRol(newRol);
  };

  return (
    <TableRow>
      <TableCell align="center">{usuario.id}</TableCell>
      <TableCell align="center">{usuario.nombre}</TableCell>
      <TableCell align="center">{usuario.email}</TableCell>
      <TableCell align="center">
        {rol === Rol.GERENTE && editar ? (
          <FormControl variant="standard" required sx={{ marginTop: 1 }}>
            <Select
              value={area ? area : "Sin area"}
              onChange={handleAreaChange}
              sx={{ width: 160, height: 40 }}
            >
              {areas.map((a) => (
                <MenuItem value={a.nombre}>
                  <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                    <b>{a.nombre}</b>
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : area ? (
          area
        ) : (
          "Sin area"
        )}
      </TableCell>
      <TableCell align="center">
        {editar ? (
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
        ) : (
          <Typography>
            {usuario.rol === Rol.ADMIN
              ? "Administrador"
              : usuario.rol === Rol.GERENTE
              ? "Gerente"
              : "Empleado"}
          </Typography>
        )}
      </TableCell>
      <TableCell align="center">
        {editar ? (
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
        ) : usuario.eliminado ? (
          "No"
        ) : (
          "Si"
        )}
      </TableCell>
      <TableCell align="center">
        {!editar ? (
          <Button onClick={handleEditar}>Editar</Button>
        ) : (
          <Button onClick={handleGuardar}>Guardar</Button>
        )}
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

      {/* Diálogo para confirmar guardar cambios */}
      <Dialog
        open={openConfirmSave}
        onClose={handleCancelSave}
        aria-labelledby="confirm-save-dialog-title"
        aria-describedby="confirm-save-dialog-description"
      >
        <DialogTitle id="confirm-save-dialog-title">
          {"¿Está seguro que desea guardar los cambios?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-save-dialog-description">
            Esta acción guardará todos los cambios realizados en este usuario.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmSave} autoFocus>
            Sí, guardar
          </Button>
          <Button onClick={handleCancelSave}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
};

export default RowUsuario;
