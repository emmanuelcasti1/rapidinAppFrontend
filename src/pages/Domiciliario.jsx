import React, { useState, useRef } from "react";
import "../styles/Domiciliario.css";
import { Link } from "react-router-dom";
import {
  crearDomiciliario,
  getDomiciliarioPorCedula,
} from "../services/domiciliarioService";

const Domiciliario = () => {
  const [domiciliario, setDomiciliario] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [nuevoDomiciliario, setNuevoDomiciliario] = useState({
    nombreDomiciliario: "",
    telefono: "",
    cedula: "",
  });
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para controlar la modal

  const resultadosRef = useRef(null); // Referencia para la sección de resultados

  const buscarDomiciliario = async () => {
    try {
      const data = await getDomiciliarioPorCedula(busqueda);
      setDomiciliario(data);
      setBusqueda(""); // Limpiar el input de búsqueda

      // Espera un pequeño tiempo antes de hacer el scroll para asegurarse de que la sección ya se renderizó
      setTimeout(() => {
        resultadosRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      alert("No se encontró el domiciliario");
    }
  };

  const handleCreateDomiciliario = async () => {
    try {
      // Validar que todos los campos estén llenos
      if (
        !nuevoDomiciliario.nombreDomiciliario.trim() ||
        !nuevoDomiciliario.cedula.trim() ||
        !nuevoDomiciliario.telefono.trim()
      ) {
        alert("Todos los datos son obligatorios");
        return;
      }

      // Crear el domiciliario
      await crearDomiciliario(nuevoDomiciliario);
      alert("Domiciliario creado con éxito");
      setNuevoDomiciliario({
        nombreDomiciliario: "",
        telefono: "",
        cedula: "",
      });
      setMostrarModal(false); // Cerrar la modal después de crear
    } catch (error) {
      alert("Error al crear el domiciliario");
    }
  };

  return (
    <div className="domiciliario-container">
      {/* Navbar */}
      <nav className="navbar-domiciliario">
        <Link to="/editarDomiciliario" className="navbar-link">
          Editar domiciliario
        </Link>
        <Link to="/eliminarDomiciliario" className="navbar-link">
          Eliminar domiciliario
        </Link>
      </nav>

      {/* Sección superior */}
      <div className="seccion-superior">
        {/* Formulario para crear domiciliario */}
        <div className="form-section">
          <h1>Crear domiciliario</h1>
          <div className="form-group">
            <label htmlFor="nombreDomiciliario">Nombre domiciliario</label>
            <input
              id="nombreDomiciliario"
              type="text"
              value={nuevoDomiciliario.nombreDomiciliario}
              onChange={(e) =>
                setNuevoDomiciliario({
                  ...nuevoDomiciliario,
                  nombreDomiciliario: e.target.value,
                })
              }
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              type="text"
              value={nuevoDomiciliario.telefono}
              onChange={(e) =>
                setNuevoDomiciliario({
                  ...nuevoDomiciliario,
                  telefono: e.target.value,
                })
              }
              placeholder="Ej: 123-456-7890"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cedula">Cédula de ciudadanía</label>
            <input
              id="cedula"
              type="text"
              value={nuevoDomiciliario.cedula}
              onChange={(e) =>
                setNuevoDomiciliario({
                  ...nuevoDomiciliario,
                  cedula: e.target.value,
                })
              }
              placeholder="Ej: 123456789"
            />
          </div>
          <button
            type="button"
            onClick={() => setMostrarModal(true)} // Abrir la modal al hacer clic
          >
            Crear
          </button>
        </div>

        {/* Búsqueda de domiciliario */}
        <div className="busqueda-section">
          <h1>Buscar domiciliario</h1>
          <div className="form-group">
            <label htmlFor="buscarDomiciliario">
              Ingresa la cédula del domiciliario
            </label>
            <input
              id="buscarDomiciliario"
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Ej: 123456789"
            />
          </div>
          <div className="form-group">
            <button type="button" onClick={buscarDomiciliario}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Resultados de la búsqueda */}
      {domiciliario && (
        <div className="resultados-busqueda" ref={resultadosRef}>
          <h2>Información del domiciliario</h2>
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
            <strong>Total domicilios:</strong> {domiciliario.totalDomicilios}
          </div>

          <h3>Domicilios realizados</h3>
          <ul className="domicilios-list">
            {domiciliario.domicilios.map((domicilio) => (
              <li key={domicilio.id} className="domicilio-item">
                <div>
                  <strong>Negocio:</strong> {domicilio.nombreNegocio}
                </div>
                <div>
                  <strong>Precio:</strong> ${domicilio.precioDomicilio}
                </div>
                <div>
                  <strong>Fecha:</strong> {domicilio.fechaDomicilio}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal de confirmación */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¿Estás seguro de crear este domiciliario?</h2>
            <div className="modal-botones">
              <button onClick={handleCreateDomiciliario} className="boton-confirmar">
                Sí, crear
              </button>
              <button
                onClick={() => setMostrarModal(false)}
                className="boton-cancelar"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Domiciliario;