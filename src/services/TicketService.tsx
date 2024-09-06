import axios from "axios";
import Ticket from "../types/Ticket";

const API_URL = "http://localhost:8080/api/tickets";

export const getTickets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data as Ticket[];
  } catch (error) {
    console.error("Error obteniendo tickets:", error);
    throw error;
  }
};

export const postTicket = async (ticket: Ticket): Promise<void> => {
  console.log(ticket);

  let ticketToSend = {
    ...ticket,
    requerimiento: {
      id: ticket.requerimiento.id,
    },
    usuario: {
      id: ticket.usuario.id,
    },
  };

  console.log(ticketToSend);

  await axios.post(API_URL, ticketToSend, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateTicket = async (ticket: Ticket) => {
  let comments = [];

  for (let i = 0; i < ticket.comentarios.length; i++) {
    let comment = {
      id: ticket.comentarios[i].id,
    };

    comments.push(comment);
  }

  let ticketToSend = {
    ...ticket,
    requerimiento: {
      id: ticket.requerimiento.id,
    },
    usuario: {
      id: ticket.usuario.id,
    },
    asignado: ticket.asignado
      ? {
          id: ticket.asignado?.id,
        }
      : null,
    comentarios: comments,
  };

  console.log(JSON.stringify(ticketToSend));

  const response = await axios.put(`${API_URL}/${ticket.id}`, ticketToSend, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data as Ticket;
};
