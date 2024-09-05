import Comentario from "./Comentario";
import Usuario from "./Usuario";

class Respuesta {
    id : number = 0;
    eliminado: boolean = false;
    contenido: string = "";
    fecha: string = new Date().toISOString();
    usuario: Usuario = new Usuario();
    comentario: Comentario = new Comentario();
}

export default Respuesta;