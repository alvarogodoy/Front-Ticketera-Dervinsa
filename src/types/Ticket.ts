import Estado from "./enums/Estado";
import Requerimiento from "./Requerimiento";
import Usuario from "./Usuario";

class Ticket {
    titulo: string = '';
    descripcion: string = '';
    fechaCreacion: Date = new Date();
    estado: Estado = Estado.POR_HACER;
    requerimiento: Requerimiento = new Requerimiento();
    usuario: Usuario = new Usuario();
}

export default Ticket;