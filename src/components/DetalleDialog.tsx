import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Ticket from "../types/Ticket";

interface DetalleDialogProps {
  onClose: () => void;
  open: boolean;
  ticket: Ticket;
}

const DetalleDialog: React.FC<DetalleDialogProps> = ({
  open,
  onClose,
  ticket,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{ borderRadius: 3 }}
    >
      <DialogTitle>{ticket.titulo}</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default DetalleDialog;
