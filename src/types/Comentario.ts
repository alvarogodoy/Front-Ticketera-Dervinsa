import Respuesta from "./Respuesta";
import Ticket from "./Ticket";
import Usuario from "./Usuario";

class Comentario {
    id : number = 0;
    eliminado: boolean = false;
    contenido: string = "";
    fecha: string = new Date().toISOString();
    usuario: Usuario = new Usuario();
    respuestas : Array<Respuesta> = new Array();
    ticket: Ticket = new Ticket(); 
}

export default Comentario;