import React, { useEffect, useState } from "react";
import {
  getAllDomicilios,
  getAllDomiciliosPorFecha,
} from "../services/domicilioService";
import "../styles/Domicilio.css"; // Importa el archivo de estilos

const Domicilio = () => {
  const [domicilios, setDomicilios] = useState([]);
  const [fecha, setFecha] = useState("");
  const [domiciliosPorFecha, setDomiciliosPorFecha] = useState([]);

  // Obtener todos los domicilios al cargar el componente
  useEffect(() => {
    const fetchDomicilios = async () => {
      try {
        const data = await getAllDomicilios();
        setDomicilios(data);
      } catch (error) {
        console.error("Error al obtener domicilios", error);
      }
    };

    fetchDomicilios();
  }, []); // El array vacío asegura que solo se ejecute una vez

  // Buscar domicilios por fecha
  const buscarDomicilioPorFecha = async () => {
    try {
      const data = await getAllDomiciliosPorFecha(fecha);
      setDomiciliosPorFecha(data);
    } catch (error) {
      alert("Introduce una fecha válida");
    }
  };

  // Función para ordenar los domicilios por fecha
  const ordenarDomicilios = (domicilios) => {
    const fechaActual = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD

    return domicilios.sort((a, b) => {
      if (a.fechaDomicilio === fechaActual && b.fechaDomicilio !== fechaActual) {
        return -1; // 'a' es de la fecha actual, va primero
      } else if (a.fechaDomicilio !== fechaActual && b.fechaDomicilio === fechaActual) {
        return 1; // 'b' es de la fecha actual, va primero
      } else {
        return new Date(b.fechaDomicilio) - new Date(a.fechaDomicilio); // Orden descendente
      }
    });
  };

  // Ordenar los domicilios generales
  const domiciliosOrdenados = ordenarDomicilios(domicilios);

  return (
    <div className="domicilio-container">
      {/* Columna izquierda: Búsqueda por fecha */}
      <div className="columna-izquierda">
        <h2>Buscar domicilios por fecha</h2>
        <div className="busqueda-fecha">
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="input-fecha"
          />
          <button onClick={buscarDomicilioPorFecha} className="boton-buscar">
            Buscar
          </button>
        </div>

        {/* Resultados de la búsqueda por fecha */}
        <div className="lista-domicilios">
          <h3>Resultados:</h3>
          {domiciliosPorFecha.length > 0 ? (
            <ul>
              {domiciliosPorFecha.map((domicilio) => (
                <li key={domicilio.id}>
                  <p><strong>Negocio:</strong> {domicilio.nombreNegocio}</p>
                  <p><strong>Precio:</strong> ${domicilio.precioDomicilio.toLocaleString()}</p>
                  <p><strong>Fecha:</strong> {domicilio.fechaDomicilio}</p>
                  <p><strong>Domiciliario:</strong> {domicilio.domiciliario.nombreDomiciliario}</p>
                  <p><strong>Teléfono:</strong> {domicilio.domiciliario.telefono}</p>
                  {/* <p><strong>Cédula:</strong> {domicilio.domiciliario.cedula}</p>
                  <p><strong>Total domicilios:</strong> ${domicilio.domiciliario.totalDomicilios.toLocaleString()}</p> */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay domicilios para esta fecha.</p>
          )}
        </div>
      </div>

      {/* Columna derecha: Lista de domicilios generales */}
      <div className="columna-derecha">
        <h2>Domicilios generales</h2>
        <div className="lista-domicilios">
          {domiciliosOrdenados.length > 0 ? (
            <ul>
              {domiciliosOrdenados.map((domicilio) => (
                <li key={domicilio.id}>
                  <p><strong>Negocio:</strong> {domicilio.nombreNegocio}</p>
                  <p><strong>Precio:</strong> ${domicilio.precioDomicilio.toLocaleString()}</p>
                  <p><strong>Fecha:</strong> {domicilio.fechaDomicilio}</p>
                  <p><strong>Domiciliario:</strong> {domicilio.domiciliario.nombreDomiciliario}</p>
                  <p><strong>Teléfono:</strong> {domicilio.domiciliario.telefono}</p>
                  {/* <p><strong>Cédula:</strong> {domicilio.domiciliario.cedula}</p>
                  <p><strong>Total domicilios:</strong> ${domicilio.domiciliario.totalDomicilios.toLocaleString()}</p> */}
                </li>
              ))}
            </ul>
          ) : (
            <p>Cargando domicilios...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Domicilio;