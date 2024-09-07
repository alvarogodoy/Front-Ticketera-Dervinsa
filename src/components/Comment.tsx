import { Box, Typography, Button, Avatar } from "@mui/material";
import { useState } from "react";
import Reply from "./Reply";
import CommentForm from "./CommentForm";
import Comentario from "../types/Comentario";

const Comment: React.FC<{
  comment: Comentario;
  onReply: (id: number, contenido: string) => void;
}> = ({ comment, onReply }) => {
  const [replying, setReplying] = useState(false);

  // Convertir la fecha del comentario a un formato legible
  const formattedDate = new Date(comment.fecha).toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box mb={1} border={1} borderRadius={1} p={1.5}>
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
          src={comment.usuario.urlPic}
        />
        <Typography sx={{ fontFamily: "Segoe UI Symbol" }}>
          <strong>
            {comment.usuario.nombre} - {formattedDate}
          </strong>
        </Typography>
      </Box>
      <Box
        sx={{
          marginLeft: 2,
          marginRight: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Segoe UI Symbol",
            marginBottom: 2,
          }}
        >
          {comment.contenido}
        </Typography>
        <Button onClick={() => setReplying(!replying)} size="small">
          {replying ? "Cancelar" : "Responder"}
        </Button>
        {replying && (
          <CommentForm
            onSubmit={(contenido) => {
              onReply(comment.id, contenido);
              setReplying(false);
            }}
          />
        )}
      </Box>
      <Box display="flex" flexDirection="column" mt={2} ml={4} gap={1}>
        {comment.respuestas
          .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()) // Ordenar por fecha ascendente
          .map((reply) => (
            <Reply key={reply.id} reply={reply} />
          ))}
      </Box>
    </Box>
  );
};

export default Comment;
