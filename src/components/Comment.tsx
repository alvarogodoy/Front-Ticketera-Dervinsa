import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import Reply from "./Reply";
import CommentForm from "./CommentForm";
import Comentario from "../types/Comentario";

const Comment: React.FC<{
  comment: Comentario;
  onReply: (id: number, contenido: string) => void;
}> = ({ comment, onReply }) => {
  const [replying, setReplying] = useState(false);

  return (
    <Box mb={3} border={1} borderRadius={2} p={2}>
      <Typography variant="body1">
        <strong>{comment.usuario.nombre}</strong>: {comment.contenido}
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
      <Box mt={2} ml={4}>
        {comment.respuestas.map((reply) => (
          <Reply key={reply.id} reply={reply} />
        ))}
      </Box>
    </Box>
  );
};

export default Comment;
