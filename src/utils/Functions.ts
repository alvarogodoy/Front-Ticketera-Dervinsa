import Prioridad from "../types/enums/Prioridad";
import Ticket from "../types/Ticket";
import Usuario from "../types/Usuario";

export const sortTickets = (criterio: string, tickets: Ticket[]): Ticket[] => {
    const prioridadMap = {
        [Prioridad.ALTA]: 1,
        [Prioridad.MEDIA]: 2,
        [Prioridad.BAJA]: 3,
      };
      
    if (criterio === "Mas nuevos") {
        tickets = tickets.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime());
    } else if (criterio === "Mas antiguos") {
        tickets = tickets.sort((a, b) => new Date(a.fechaCreacion).getTime() - new Date(b.fechaCreacion).getTime());
    } else if (criterio === "Prioridad mas alta") {
        tickets = tickets.sort((a, b) => prioridadMap[a.prioridad] - prioridadMap[b.prioridad]);
    } else if (criterio === "Prioridad mas baja") {
        tickets = tickets.sort((a, b) => prioridadMap[b.prioridad] - prioridadMap[a.prioridad]);
    }

    return tickets;
}

export const filterTickets = (criterio: string, tickets: Ticket[], user: Usuario| null): Ticket[] => {
    if (criterio === "Sin asignar") {
        tickets = tickets.filter(t => t.asignado == null);
    } else if (criterio === "Asignados a mi") {
        tickets = tickets.filter(t => t.asignado?.nombre === user?.nombre);
    }

    return tickets;
}

