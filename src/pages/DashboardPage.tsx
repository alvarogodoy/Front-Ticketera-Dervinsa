import { useAuth0 } from "@auth0/auth0-react";
import { getUsuarios, postUsuario } from "../services/UsuarioService";
import Usuario from "../types/Usuario";
import { useEffect } from "react";
import MisTicketsPage from "./MisTicketsPage";

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      handlePersist();
    }
  }, [isAuthenticated, user]);

  const handlePersist = async () => {
    try {
      const usuarios: Usuario[] = await getUsuarios();
      const usuariosXEmail = usuarios.filter(
        (usuario) => usuario.email === user?.email
      );

      if (usuariosXEmail.length === 0) {
        let usuario: Usuario = new Usuario();
        usuario.email = user?.email;
        usuario.urlPic = user?.picture;
        await postUsuario(usuario);
      }
    } catch (error) {
      console.error("Error handling persist:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MisTicketsPage />
    </>
  );
};

export default DashboardPage;
