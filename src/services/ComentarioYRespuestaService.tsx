import axios from "axios";
import Comentario from "../types/Comentario";
import Respuesta from "../types/Respuesta";

const COM_URL = "http://localhost:8080/api/comentarios";
const RES_URL = "http://localhost:8080/api/respuestas";

export const getComentarios = async () => {
  try {
    const response = await axios.get(COM_URL);
    return response.data as Comentario[];
  } catch (error) {
    console.error("Error obteniendo areas:", error);
    throw error;
  }
};

export const saveCommentToDatabase = async (comment: Comentario) => {
  let commentToSend = {
    ...comment,
    usuario: {
      id: comment.usuario.id,
    },
    ticket: {
      id: comment.ticket.id,
    },
  };

  try {
    const response = await fetch(COM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentToSend),
    });
    if (!response.ok) throw new Error("Error al guardar el comentario");
    const savedComment = await response.json();
    return savedComment;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getRespuestas = async () => {
  try {
    const response = await axios.get(RES_URL);
    return response.data as Respuesta[];
  } catch (error) {
    console.error("Error obteniendo areas:", error);
    throw error;
  }
};

export const saveReplyToDatabase = async (reply: Respuesta) => {
  let replyToSend = {
    ...reply,
    usuario: {
      id: reply.usuario.id,
    },
    comentario: {
      id: reply.comentario.id,
    },
  };

  try {
    const response = await fetch(RES_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(replyToSend),
    });
    if (!response.ok) throw new Error("Error al guardar la respuesta");
    const savedReply = await response.json();
    return savedReply;
  } catch (error) {
    console.error("Error:", error);
  }
};
