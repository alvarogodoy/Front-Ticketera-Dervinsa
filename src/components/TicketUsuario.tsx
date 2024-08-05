import { Grid, Box, Typography, Button } from "@mui/material";
import Ticket from "../types/Ticket";
import { useEffect, useState } from "react";
import Estado from "../types/enums/Estado";

interface TicketUsuarioProps {
  ticket: Ticket | null;
}

const TicketUsuario: React.FC<TicketUsuarioProps> = ({ ticket }) => {
  const [headerColor, setHeaderColor] = useState<string>("");

  useEffect(() => {
    if (ticket?.estado === Estado.POR_HACER) {
      setHeaderColor("#2e60b0");
    } else if (ticket?.estado === Estado.EN_PROGRESO) {
      setHeaderColor("#858226");
    } else if (ticket?.estado === Estado.COMPLETADO) {
      setHeaderColor("#0c912b");
    } else {
      setHeaderColor("#8c130a");
    }
  });

  return (
    <Grid item xs={3}>
      <Box
        sx={{
          bgcolor: "#fff",
          height: 200,
          borderRadius: 3,
          boxShadow: 2,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          borderBottom={`3px solid ${headerColor}`}
          sx={{
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            padding: 1,
          }}
        >
          <Typography variant="subtitle1">
            <b>{ticket?.estado}</b>
          </Typography>
        </Box>
        <Box sx={{ padding: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">{ticket?.titulo}</Typography>
          <Typography variant="subtitle2">
            {ticket?.requerimiento.descripcion}
          </Typography>

          <Button variant="contained" sx={{ bgcolor: "#222" }}>
            Ver detalle
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default TicketUsuario;
