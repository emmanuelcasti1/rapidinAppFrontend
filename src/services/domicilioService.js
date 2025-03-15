import api from "./api";

// Crear un nuevo domicilio
export const crearDomicilio = async (domicilio) => {
    try {
      const response = await api.post(`/domicilios`, domicilio);
      return response.data;
    } catch (error) {
      console.error("Error al crear domicilio", error);
      throw error;
    }
  };

  // Obtener todos los domicilios
export const getAllDomicilios = async () => {
  try {
    const response = await api.get(`/domicilios`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los domicilios", error);
    throw error;
  }
};

  // Obtener domicilios por fecha
  export const getAllDomiciliosPorFecha = async (fecha) => {
    try {
      const response = await api.get(`/domicilios/PorFecha/${fecha}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los domicilios", error);
      throw error;
    }
  };