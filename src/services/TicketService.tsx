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
