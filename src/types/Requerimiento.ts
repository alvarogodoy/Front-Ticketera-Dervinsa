import Area from "./Area";
import Ticket from "./Ticket";

class Requerimiento {
    id : number = 0;
    eliminado: boolean = false;
    descripcion: string = '';
    tickets: Array<Ticket> = new Array();
    area: Area | undefined = new Area();
}

export default Requerimiento;