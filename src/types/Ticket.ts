import Estado from "./enums/Estado";
import Prioridad from "./enums/Prioridad";
import Requerimiento from "./Requerimiento";
import Usuario from "./Usuario";

class Ticket {
    id : number = 0;
    titulo: string = '';
    descripcion: string = '';
    fechaCreacion: string = new Date().toISOString();
    estado: Estado = Estado.POR_HACER;
    prioridad: Prioridad = Prioridad.BAJA;
    requerimiento: Requerimiento = new Requerimiento();
    usuario: Usuario = new Usuario();
}

export default Ticket;