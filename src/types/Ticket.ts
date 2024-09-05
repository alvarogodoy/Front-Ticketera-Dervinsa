import Comentario from "./Comentario";
import Estado from "./enums/Estado";
import Prioridad from "./enums/Prioridad";
import Requerimiento from "./Requerimiento";
import Usuario from "./Usuario";

class Ticket {
    id : number = 0;
    eliminado: boolean = false;
    titulo: string = '';
    descripcion: string = '';
    fechaCreacion: string = new Date().toISOString();
    fechaCierre: string = '';
    estado: Estado = Estado.POR_HACER;
    prioridad: Prioridad = Prioridad.BAJA;
    requerimiento: Requerimiento = new Requerimiento();
    usuario: Usuario = new Usuario();
    asignado: Usuario | null = null;
    comentarios: Array<Comentario> = new Array();
}

export default Ticket;