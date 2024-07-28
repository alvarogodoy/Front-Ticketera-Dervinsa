import Area from "./Area";
import Rol from "./enums/Rol";
import Ticket from "./Ticket";

class Usuario {
  eliminado: boolean = false;
  email: string | undefined = "";
  urlPic: string | undefined = "";
  tickets: Array<Ticket> = new Array();
  area: Area|undefined;
  rol: Rol = Rol.EMPLEADO;
}

export default Usuario;
