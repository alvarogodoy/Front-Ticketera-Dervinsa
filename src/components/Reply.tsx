import { Box, Typography } from "@mui/material";
import Respuesta from "../types/Respuesta";

const Reply: React.FC<{ reply: Respuesta }> = ({ reply }) => (
  <Box mb={1} border={1} borderRadius={2} p={2}>
    <Typography variant="body2">
      <strong>{reply.usuario.nombre}</strong>: {reply.contenido}
    </Typography>
  </Box>
);

export default Reply;
