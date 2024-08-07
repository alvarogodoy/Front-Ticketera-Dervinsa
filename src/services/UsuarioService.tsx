import axios from "axios";
import Usuario from "../types/Usuario";

const API_URL = "http://localhost:8080/api/usuarios";

export const getUsuarios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data as Usuario[];
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw error;
  }
};

export const getUsuarioByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${API_URL}/porEmail/${email}`);
    return response.data as Usuario;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw error;
  }
};

export const postUsuario = async (usuario: Usuario) => {
  console.log(JSON.stringify(usuario));
  const response = await axios.post(API_URL, usuario, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data as Usuario;
};
