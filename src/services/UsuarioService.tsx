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
    const response = await axios.get(`${API_URL}/${email}`);
    return response.data as Usuario;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw error;
  }
};

export const postUsuario = async (usuario: Usuario): Promise<void> => {
  console.log(JSON.stringify(usuario));
  await axios.post(API_URL, usuario, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
