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
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
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
  const [openConfirmSave, setOpenConfirmSave] = useState(false);

  const [originalArea, setOriginalArea] = useState<string | undefined>(usuario.area?.nombre); // Guardar el valor original
  const [originalRol, setOriginalRol] = useState<Rol>(usuario.rol); // Guardar el valor original
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(false); // Nuevo estado para el botón de guardar


  useEffect(() => {
    const getAreasDB = async () => {
      let areasDB = await getAreas();
      setAreas(areasDB);
    };

    getAreasDB();
  });

  useEffect(() => {
    // Sincronizar el estado de `habilitado` con el valor actual cuando se reentra al modo de edición
    if (editar) {
      setHabilitado(!usuario.eliminado);
    }
  }, [editar, usuario.eliminado]);

  useEffect(() => {
    // Actualizar estado del botón de guardar
    if (rol === Rol.GERENTE && !area) {
      setIsSaveDisabled(true);
    } else {
      setIsSaveDisabled(false);
    }
  }, [rol, area]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditar = () => {
    setOriginalRol(rol); // Guardar el rol original antes de editar
    setOriginalArea(area); // Guardar el área original antes de editar
    setTempHabilitado(habilitado); // Guardar el estado de habilitado antes de editar
    setEditar(true);
  };

  const handleCancelar = () => {
    setRol(originalRol); // Restaurar el rol original
    setArea(originalArea); // Restaurar el área original
    setHabilitado(tempHabilitado); // Restaurar el estado de habilitado original
    setEditar(false);
  };

  const handleGuardar = () => {
    setOpenConfirmSave(true);
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
    setOpenConfirmSave(false);
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
    <TableRow
      sx={{
        backgroundColor: usuario.eliminado ? "#ffeeee" : "inherit",
        color: usuario.eliminado ? "white" : "inherit",
        height: 85, // Aumenta la altura de cada fila
      }}
    >
      <TableCell align="center" sx={{ minWidth: 50 }}>
        <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>{usuario.id}</Typography>
      </TableCell>
      <TableCell align="center" sx={{ minWidth: 300 }}>
        <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>{usuario.nombre}</Typography>
      </TableCell>
      <TableCell align="center" sx={{ minWidth: 300 }}>
        <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>{usuario.email}</Typography>
      </TableCell>
      <TableCell align="center" sx={{ minWidth: 200 }}>
        {editar ? (
          <FormControl variant="standard" required sx={{ marginTop: 0 }}>
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
          <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
            {usuario.rol === Rol.ADMIN
              ? "Administrador"
              : usuario.rol === Rol.GERENTE
              ? "Gerente"
              : "Empleado"}
          </Typography>
        )}
      </TableCell>
      <TableCell align="center" sx={{ minWidth: 300 }}>
        {rol === Rol.GERENTE && editar ? (
          <FormControl variant="standard" required sx={{ marginTop: 0 }}>
            <Select
              value={area ? area : "Sin area"}
              onChange={handleAreaChange}
              sx={{ width: 160, height: 40, fontFamily: "Segoe UI Symbol" }}
            >
              {areas.map((a) => (
                <MenuItem key={a.id} value={a.nombre}>
                  <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
                    <b>{a.nombre}</b>
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
            {area ? area : "Sin area"}
          </Typography>
        )}
      </TableCell>
      <TableCell align="center" sx={{ minWidth: 50, justifyContent: "center" }}>
        {editar ? (
          <FormControlLabel
            control={
              <Checkbox
                checked={habilitado}
                onChange={handleChangeHabilitado}
                name="checked"
                color="primary"
                sx={{
                  padding: 0, // Eliminar padding adicional
                }}
              />
            }
            label=""
            sx={{
              margin: 0, // Eliminar margen adicional
            }}
          />
        ) : (
          <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
            {usuario.eliminado ? "No" : "Si"}
          </Typography>
        )}
      </TableCell>
      <TableCell align="center" sx={{ minWidth: 150 }}>
        {!editar ? (
          <IconButton onClick={handleEditar}>
            <Tooltip title="Editar Usuario">
              <EditIcon />
            </Tooltip>
          </IconButton>
        ) : (
          <>
            <IconButton onClick={handleGuardar} disabled={isSaveDisabled}>
              <Tooltip title="Guardar Cambios">
                <SaveIcon />
              </Tooltip>
            </IconButton>
            <IconButton onClick={handleCancelar}>
              <Tooltip title="Cancelar">
                <CancelIcon />
              </Tooltip>
            </IconButton>
          </>
        )}
      </TableCell>

      {/* Dialog for confirming disable */}
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
          <Button onClick={handleConfirmDisable} color="primary" autoFocus>
            Sí
          </Button>
          <Button onClick={handleClose} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for confirming save */}
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
          <Button onClick={handleConfirmSave} color="primary" autoFocus>
            Sí, guardar
          </Button>
          <Button onClick={handleCancelSave} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
};

export default RowUsuario;
