import React, { useState } from "react";
import { getDomiciliarioPorCedula, eliminarDomiciliario } from "../services/domiciliarioService";
import "../styles/EliminarDomiciliario.css";

const EliminarDomiciliario = () => {
  const [domiciliario, setDomiciliario] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [buscando, setBuscando] = useState(false);

  // Función para buscar el domiciliario por cédula en la API
  const buscarDomiciliario = async () => {
    const cedulaABuscar = document.getElementById("buscarDomiciliario").value;
    if (!cedulaABuscar) {
      alert("Por favor, ingresa una cédula.");
      return;
    }

    try {
      setBuscando(true);
      const data = await getDomiciliarioPorCedula(cedulaABuscar);
      setDomiciliario(data); // Guardamos el domiciliario encontrado
    } catch (error) {
      alert("Domiciliario no encontrado.");
    } finally {
      setBuscando(false);
    }
  };

  // Función para mostrar el modal de confirmación
  const confirmarEliminacion = () => {
    setMostrarModal(true);
  };

  // Función para eliminar el domiciliario en la API
  const handleEliminarDomiciliario = async () => {
    if (!domiciliario) return;

    try {
      await eliminarDomiciliario(domiciliario.cedula);
      alert("Domiciliario eliminado correctamente.");
      setDomiciliario(null); // Limpiar el estado
    } catch (error) {
      alert("Error al eliminar el domiciliario.");
    } finally {
      setMostrarModal(false);
    }
  };

  return (
    <div className="eliminar-domiciliario-container">
      <div className="seccion-superior">
        <h1>Eliminar Domiciliario</h1>
        <div className="form-group">
          <label htmlFor="buscarDomiciliario">Cédula del domiciliario:</label>
          <input id="buscarDomiciliario" type="text" placeholder="Ej: 123456789" />
          <button type="button" onClick={buscarDomiciliario} disabled={buscando}>
            {buscando ? "Buscando..." : "Buscar"}
          </button>
        </div>

        {domiciliario && (
          <div className="info-domiciliario">
            <h2>Información del Domiciliario</h2>
            <p><strong>Nombre:</strong> {domiciliario.nombreDomiciliario}</p>
            <p><strong>Teléfono:</strong> {domiciliario.telefono}</p>
            <p><strong>Cédula:</strong> {domiciliario.cedula}</p>
            <button onClick={confirmarEliminacion} className="boton-eliminar">
              Eliminar domiciliario
            </button>
          </div>
        )}
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¿Estás seguro de eliminar este domiciliario?</h2>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modal-botones">
              <button onClick={handleEliminarDomiciliario} className="boton-confirmar">
                Sí, eliminar
              </button>
              <button onClick={() => setMostrarModal(false)} className="boton-cancelar">
                No, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EliminarDomiciliario;
