import axios from "axios";
import Area from "../types/Area";

const API_URL = "http://localhost:8080/api/areas";

export const getAreas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data as Area[];
  } catch (error) {
    console.error("Error obteniendo areas:", error);
    throw error;
  }
};

export const postArea = async (area: Area): Promise<void> => {
  await axios.post(API_URL, area, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
