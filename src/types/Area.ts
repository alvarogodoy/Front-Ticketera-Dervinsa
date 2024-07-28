import Requerimiento from "./Requerimiento";
import Usuario from "./Usuario";

class Area {
    eliminado: boolean = false;
    nombre: string = '';
    requerimientos: Array<Requerimiento> = new Array();
    gerentes: Array<Usuario> = new Array();
}

export default Area;