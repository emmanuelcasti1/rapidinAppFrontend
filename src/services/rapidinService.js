import api from "./api";

// Obtener rapidines por fecha especifica
  export const getRapidinesPorDiaEspecifico = async (fecha) => {
    try {
      const response = await api.get(`/rapidines/${fecha}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener rapidines", error);
      throw error;
    }
  };
  
    // Obtener rapidines actuales
    export const getAllDomiciliosPorActual = async () => {
      try {
        const response = await api.get(`/rapidines/hoy`);
        return response.data;
      } catch (error) {
        console.error("Error al obtener rapidines", error);
        throw error;
      }
    };

   // Resetear los rapidines
export const crearDomiciliario = async () => {
    try {
      const response = await api.post(`/rapidines`);
      return response.data;
    } catch (error) {
      console.error("Error al resetear los rapidines", error);
      throw error;
    }
  };

  // Resetear el total de domiciliarios
export const resetearTotalDomiciliarios = async () => {
    try {
      const response = await api.post(`/domiciliarios/resetearTotal`);
      return response.data;
    } catch (error) {
      console.error("Error al resetear totales de domiciliarios", error);
      throw error;
    }
  };