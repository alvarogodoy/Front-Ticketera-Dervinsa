import Area from "./Area";
import Ticket from "./Ticket";

class Requerimiento {
    eliminado: boolean = false;
    descripcion: string = '';
    tickets: Array<Ticket> = new Array();
    area: Area = new Area();
}

export default Requerimiento;