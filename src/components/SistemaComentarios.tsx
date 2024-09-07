import { Box } from "@mui/material";
import { useState } from "react";
import Comentario from "../types/Comentario";
import Usuario from "../types/Usuario";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import Respuesta from "../types/Respuesta";
import { useAuth } from "../context/AuthContext";
import {
  saveCommentToDatabase,
  saveReplyToDatabase,
} from "../services/ComentarioYRespuestaService";
import Ticket from "../types/Ticket";

interface SistemaComentariosProps {
  ticket: Ticket;
}

const SistemaComentarios: React.FC<SistemaComentariosProps> = ({ ticket }) => {
  const [comments, setComments] = useState<Comentario[]>(ticket.comentarios);
  const { user } = useAuth();

  const addComment = async (contenido: string) => {
    const newComment = new Comentario();
    newComment.ticket = ticket;
    newComment.contenido = contenido;
    newComment.usuario = user ? user : new Usuario(); // Usa el usuario autenticado

    const savedComment = await saveCommentToDatabase(newComment);
    if (savedComment) {
      setComments([...comments, savedComment]);
    }
  };

  const addReply = async (commentId: number, contenido: string) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment) {
      const newReply = new Respuesta();
      newReply.contenido = contenido;
      newReply.usuario = user ? user : new Usuario(); // Usa el usuario autenticado
      newReply.comentario = comment;

      const savedReply = await saveReplyToDatabase(newReply);
      if (savedReply) {
        comment.respuestas.push(savedReply);
        setComments([...comments]);
      }
    }
  };

  return (
    <Box>
      <CommentForm onSubmit={addComment} />
      <Box mt={2}>
        {comments
          .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()) // Ordenar por fecha descendente
          .map((comment) => (
            <Comment key={comment.id} comment={comment} onReply={addReply} />
          ))}
      </Box>
    </Box>
  );
};


export default SistemaComentarios;
