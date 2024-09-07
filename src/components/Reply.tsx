import { Avatar, Box, Typography } from "@mui/material";
import Respuesta from "../types/Respuesta";

const Reply: React.FC<{ reply: Respuesta }> = ({ reply }) => {
  // Convertir la fecha de la respuesta a un formato legible
  const formattedDate = new Date(reply.fecha).toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box border={1} borderRadius={1.5} p={1}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Avatar
          sx={{
            borderRadius: "4px",
            width: 24,
            height: 24,
            mr: 1,
          }}
          src={reply.usuario.urlPic}
        />
        <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
          <strong>
            {reply.usuario.nombre} - {formattedDate}
          </strong>
        </Typography>
      </Box>
      <Box
        sx={{
          marginLeft: 2,
          marginRight: 2,
        }}
      >
        <Typography variant="body2">
          <Typography
            sx={{
              fontFamily: "Segoe UI Symbol",
              marginBottom: 2,
            }}
          >
            {reply.contenido}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Reply;
