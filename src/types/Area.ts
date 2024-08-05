import Requerimiento from "./Requerimiento";
import Usuario from "./Usuario";

class Area {
    id : number = 0;
    eliminado: boolean = false;
    nombre: string = '';
    requerimientos: Array<Requerimiento> = new Array();
    gerentes: Array<Usuario> = new Array();
}

export default Area;