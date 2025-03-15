import React, { useState } from "react";
import {
  getDomiciliarioPorCedula,
  editarDomiciliario,
} from "../services/domiciliarioService";

const EditarDomiciliario = () => {
  const [domiciliario, setDomiciliario] = useState(null);
  const [nombreDomiciliario, setNombreDomiciliario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cedula, setCedula] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

  const buscarDomiciliario = async () => {
    try {
      const data = await getDomiciliarioPorCedula(busqueda);
      if (data) {
        setDomiciliario(data);
        setNombreDomiciliario(data.nombreDomiciliario);
        setTelefono(data.telefono);
        setCedula(data.cedula);
      }
    } catch (error) {
      alert("Introduce un domiciliario valido");
    }
  };

  const abrirModalEditar = () => setMostrarModalEditar(true);
  const cerrarModalEditar = () => setMostrarModalEditar(false);


  const confirmarGuardarCambios = async () => {
    if (!nombreDomiciliario.trim() || !telefono.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    try {
      await editarDomiciliario(cedula, { nombreDomiciliario, telefono, cedula });
      alert("Cambios guardados correctamente");
      cerrarModalEditar();
    } catch (error) {
      alert("Error al guardar los cambios");
    }
  };
  


  return (
    <div className="editar-domiciliario-container">
      <div className="seccion-superior">
        <div className="busqueda-section">
          <h1>Editar domiciliario</h1>
          <div className="form-group">
            <label htmlFor="buscarDomiciliario">Ingresa la cédula</label>
            <input
              id="buscarDomiciliario"
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Ej: 123456789"
            />
          </div>
          <button type="button" onClick={buscarDomiciliario}>
            Buscar
          </button>
        </div>

        {domiciliario && (
          <div className="form-section">
            <h2>Editar datos</h2>
            <div className="form-group">
              <label htmlFor="nombreDomiciliario">Nombre</label>
              <input
                id="nombreDomiciliario"
                type="text"
                value={nombreDomiciliario}
                onChange={(e) => setNombreDomiciliario(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                id="telefono"
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cedula">Cédula</label>
              <input id="cedula" type="text" value={cedula} disabled />
            </div>
            <button type="button" onClick={abrirModalEditar}>
              Guardar cambios
            </button>
          </div>
        )}
        
      </div>

      {/* MODAL DE CONFIRMACIÓN PARA EDITAR */}
      {mostrarModalEditar && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¿Estás seguro?</h2>
            <p>¿Deseas guardar los cambios en el domiciliario?</p>
            <div className="modal-botones">
              <button
                onClick={confirmarGuardarCambios}
                className="boton-confirmar-editar"
              >
                Sí, guardar
              </button>
              <button onClick={cerrarModalEditar} className="boton-cancelar">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditarDomiciliario;
