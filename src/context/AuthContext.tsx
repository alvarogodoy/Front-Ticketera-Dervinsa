import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  Auth0Provider,
  useAuth0,
  RedirectLoginOptions,
  LogoutOptions,
} from "@auth0/auth0-react";
import Usuario from "../types/Usuario";
import { AuthConfig } from "../config/AuthConfig";
import { getUsuarioByEmail, postUsuario } from "../services/UsuarioService";

interface AuthContextType {
  isAuthenticated: boolean;
  user: Usuario | null;
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
  logout: (options?: LogoutOptions) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  domain: string;
  clientId: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  domain,
  clientId,
}) => {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: AuthConfig.redirectUri,
      }}
    >
      <AuthContextProvider>{children}</AuthContextProvider>
    </Auth0Provider>
  );
};

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    isAuthenticated,
    user: auth0User,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const loadUserFromSessionStorage = () => {
      const userFromSessionStorage = sessionStorage.getItem("user");
      if (userFromSessionStorage) {
        setUser(JSON.parse(userFromSessionStorage));
      }
    };

    loadUserFromSessionStorage();
  }, []);

  useEffect(() => {
    const handleUser = async () => {
      if (isAuthenticated && auth0User?.email) {
        try {
          // Buscar el usuario por correo electrónico
          let fetchedUser = await getUsuarioByEmail(auth0User.email);

          // Si el usuario no existe, crear uno nuevo
          if (!fetchedUser) {
            fetchedUser = new Usuario();
            fetchedUser.email = auth0User?.email;
            fetchedUser.urlPic = auth0User?.picture;
            await postUsuario(fetchedUser);
          }

          // Actualizar el contexto con el usuario
          setUser(fetchedUser);

          // Guardar el usuario en sessionStorage
          sessionStorage.setItem("user", JSON.stringify(fetchedUser));
        } catch (error) {
          console.error("Error handling user:", error);
        }
      }
    };

    handleUser();
  }, [isAuthenticated, auth0User]);

  const value = {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
