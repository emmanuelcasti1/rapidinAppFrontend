import api from "./api"

// Obtener todos los domiciliarios
export const getAllDomiciliarios = async () => {
  try {
    const response = await api.get(`/domiciliarios`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los domiciliarios", error);
    throw error;
  }
};

// Obtener domiciliario por cédula
export const getDomiciliarioPorCedula = async (cedula) => {
  try {
    const response = await api.get(`/domiciliarios/cedula/${cedula}`);
    return response.data;
  } catch (error) {
    console.error("Error al buscar domiciliario por cédula", error);
    throw error;
  }
};

// Obtener domiciliario por ID
export const getDomiciliarioPorId = async (id) => {
  try {
    const response = await api.get(`/domiciliarios/id/${id}`); 
    return response.data;
  } catch (error) {
    console.error("Error al buscar domiciliario por ID", error);
    throw error;
  }
};

// Crear un nuevo domiciliario
export const crearDomiciliario = async (domiciliario) => {
  try {
    const response = await api.post(`/domiciliarios`, domiciliario);
    return response.data;
  } catch (error) {
    console.error("Error al crear domiciliario", error);
    throw error;
  }
};

// Editar un domiciliario por cédula (Patch)
export const editarDomiciliario = async (cedula, datosEditados) => {
  try {
    const response = await api.patch(`/domiciliarios/${cedula}`, datosEditados);
    return response.data;
  } catch (error) {
    console.error("Error al editar domiciliario", error);
    throw error;
  }
};

// Eliminar un domiciliario por cédula
export const eliminarDomiciliario = async (cedula) => {
  try {
    await api.delete(`/domiciliarios/${cedula}`);
  } catch (error) {
    console.error("Error al eliminar domiciliario", error);
    throw error;
  }
};


