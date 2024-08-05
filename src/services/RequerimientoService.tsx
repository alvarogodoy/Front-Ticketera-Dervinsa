import axios from "axios";
import Requerimiento from "../types/Requerimiento";

const API_URL = "http://localhost:8080/api/requerimientos";

export const getRequerimientos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data as Requerimiento[];
  } catch (error) {
    console.error("Error obteniendo requerimientos:", error);
    throw error;
  }
};

export const postRequerimiento = async (req: Requerimiento): Promise<void> => {
  await axios.post(API_URL, req, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
