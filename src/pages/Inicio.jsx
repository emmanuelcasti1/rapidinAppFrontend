import React, { useEffect, useState } from "react";
import { getAllDomiciliarios } from "../services/domiciliarioService";
import { crearDomicilio } from "../services/domicilioService";
import "../styles/Inicio.css";

const Inicio = () => {
  const [domiciliarios, setDomiciliarios] = useState([]);
  const [nuevoDomicilio, setNuevoDomicilio] = useState({
    domiciliarioId: "",
    nombreNegocio: "",
    precioDomicilio: "",
  });
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  const confirmarCrearDomicilio = async () => {
    try {
      // Validar campos obligatorios
      if (
        !nuevoDomicilio.domiciliarioId.trim() ||
        !nuevoDomicilio.nombreNegocio.trim() ||
        !nuevoDomicilio.precioDomicilio.trim()
      ) {
        alert("Todos los datos son obligatorios");
        return;
      }

      // Validar que domiciliarioId sea un número válido
      const domiciliarioIdNum = Number(nuevoDomicilio.domiciliarioId);
      if (isNaN(domiciliarioIdNum) || domiciliarioIdNum <= 0) {
        alert("El ID del domiciliario debe ser un número válido");
        return;
      }

      // Construir objeto para la API
      const domicilioData = {
        domiciliarioId: domiciliarioIdNum,
        nombreNegocio: nuevoDomicilio.nombreNegocio,
        precioDomicilio: Number(nuevoDomicilio.precioDomicilio),
      };

      // Enviar a la API
      await crearDomicilio(domicilioData);
      alert("Domicilio creado exitosamente");
      cerrarModal();
      setNuevoDomicilio({
        domiciliarioId: "",
        nombreNegocio: "",
        precioDomicilio: "",
      });
    } catch (error) {
      console.error("Error al crear el domicilio:", error);
      alert("Error al crear el domicilio");
      cerrarModal();
    }
  };

  useEffect(() => {
    const fetchDomiciliarios = async () => {
      try {
        const data = await getAllDomiciliarios();
        setDomiciliarios(data);
      } catch (error) {
        console.error("Error al obtener domiciliarios", error);
      }
    };

    fetchDomiciliarios();
  }, [nuevoDomicilio]);

  return (
    <div className="inicio-container">
      {/* Formulario en la parte izquierda */}
      <div className="form-section">
        <h1>Crear domicilio</h1>
        <div className="form-group">
          <label htmlFor="domiciliarioId">Id domiciliario</label>
          <input
            id="domiciliarioId"
            type="text"
            value={nuevoDomicilio.domiciliarioId}
            onChange={(e) =>
              setNuevoDomicilio({
                ...nuevoDomicilio,
                domiciliarioId: e.target.value,
              })
            }
            placeholder="1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombreNegocio">Nombre del negocio</label>
          <input
            id="nombreNegocio"
            type="text"
            value={nuevoDomicilio.nombreNegocio}
            onChange={(e) =>
              setNuevoDomicilio({
                ...nuevoDomicilio,
                nombreNegocio: e.target.value,
              })
            }
            placeholder="Pasteur"
          />
        </div>
        <div className="form-group">
          <label htmlFor="precioDomicilio">Precio del domicilio</label>
          <input
            id="precioDomicilio"
            type="text"
            value={nuevoDomicilio.precioDomicilio}
            onChange={(e) =>
              setNuevoDomicilio({
                ...nuevoDomicilio,
                precioDomicilio: e.target.value,
              })
            }
            placeholder="5000"
          />
        </div>
        <button type="submit" onClick={abrirModal}>
          Crear
        </button>
      </div>

      {/* Lista de domiciliarios en la parte derecha */}
      <div className="list-section">
        <h1>Domiciliarios</h1>
        <ul className="domiciliarios-list">
          {domiciliarios.length > 0 ? (
            domiciliarios.map((domiciliario) => (
              <li key={domiciliario.id} className="domiciliario-item">
                <div className="domiciliario-info">
                  <strong>Id:</strong> {domiciliario.id}
                </div>
                <div className="domiciliario-info">
                  <strong>Nombre:</strong> {domiciliario.nombreDomiciliario}
                </div>
                <div className="domiciliario-info">
                  <strong>Teléfono:</strong> {domiciliario.telefono}
                </div>
                <div className="domiciliario-info">
                  <strong>Cédula:</strong> {domiciliario.cedula}
                </div>
                <div className="domiciliario-info">
                  <strong>Total domicilios:</strong>
                  <span className="total-domicilios">
                    {" "}
                    {domiciliario.totalDomicilios}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <p>No hay domiciliarios registrados.</p>
          )}
        </ul>
      </div>
      {/* MODAL DE CONFIRMACIÓN  */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¿Estás seguro?</h2>
            <p>¿Deseas guardar el domicilio?</p>
            <div className="modal-botones">
              <button
                onClick={confirmarCrearDomicilio}
                className="boton-confirmar-domicilio"
              >
                Sí, guardar
              </button>
              <button onClick={cerrarModal} className="boton-cancelar">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inicio;
