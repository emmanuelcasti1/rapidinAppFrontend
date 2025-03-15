import React, { useEffect, useState } from "react";
import {
  getRapidinesPorDiaEspecifico,
  getAllDomiciliosPorActual,
  crearDomiciliario,
  resetearTotalDomiciliarios,
} from "../services/rapidinService"; // Ajusta la ruta según tu estructura
import "../styles/Rapidin.css"; // Importa el archivo de estilos

const Rapidin = () => {
  const [fecha, setFecha] = useState("");
  const [rapidinesPorFecha, setRapidinesPorFecha] = useState([]);
  const [rapidinesActuales, setRapidinesActuales] = useState([]);
  const [totalGeneradoHoy, setTotalGeneradoHoy] = useState(0);
  const [mostrarModalResetRapidin, setMostrarModalResetRapidin] =
    useState(false);
  const [mostrarModalResetDomiciliarios, setMostrarModalResetDomiciliarios] =
    useState(false);

  // Obtener rapidines actuales al cargar el componente
  useEffect(() => {
    const fetchRapidinesActuales = async () => {
      try {
        const data = await getAllDomiciliosPorActual();

        // Filtrar rapidines con totalIngreso > 0.0
        const rapidinesFiltrados = data.filter(
          (rapidin) => rapidin.totalIngreso > 0.0
        );
        setRapidinesActuales(rapidinesFiltrados);

        // Calcular el total generado hoy
        const totalHoy = rapidinesFiltrados.reduce(
          (sum, rapidin) => sum + rapidin.totalIngreso,
          0
        );
        setTotalGeneradoHoy(totalHoy);
      } catch (error) {
        console.error("Error al obtener rapidines actuales", error);
      }
    };

    fetchRapidinesActuales();
  }, []);

  // Buscar rapidines por fecha específica
  const buscarRapidinPorFecha = async () => {
    try {
      const data = await getRapidinesPorDiaEspecifico(fecha);

      // Filtrar rapidines con totalIngreso > 0.0
      const rapidinesFiltrados = data.filter(
        (rapidin) => rapidin.totalIngreso > 0.0
      );
      setRapidinesPorFecha(rapidinesFiltrados);
    } catch (error) {
      alert("Introduce una fecha válida");
    }
  };

  // Resetear rapidines
  const handleResetRapidin = async () => {
    try {
      await crearDomiciliario();
      alert("Rapidines reseteados correctamente");
      setMostrarModalResetRapidin(false);
      // Recargar rapidines actuales
      const data = await getAllDomiciliosPorActual();
      const rapidinesFiltrados = data.filter(
        (rapidin) => rapidin.totalIngreso > 0.0
      );
      setRapidinesActuales(rapidinesFiltrados);
    } catch (error) {
      alert("Error al resetear rapidines");
      setMostrarModalResetRapidin(false);
    }
  };

  // Resetear totales de domiciliarios
  const handleResetDomiciliarios = async () => {
    try {
      await resetearTotalDomiciliarios();
      alert("Totales de domiciliarios reseteados correctamente");
      setMostrarModalResetDomiciliarios(false);
    } catch (error) {
      alert("Error al resetear totales de domiciliarios");
      setMostrarModalResetDomiciliarios(false);
    }
  };

  return (
    <div className="rapidin-container">
      {/* Sección izquierda: Búsqueda por fecha específica */}
      <div className="seccion-izquierda">
        <h2>Buscar rapidines por fecha</h2>
        <div className="busqueda-fecha">
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="input-fecha"
          />
          <button onClick={buscarRapidinPorFecha} className="boton-buscar">
            Buscar
          </button>
        </div>

        {/* Resultados de la búsqueda por fecha */}
        <div className="resultados-fecha">
          <h3>Resultados:</h3>
          {rapidinesPorFecha.length > 0 ? (
            <ul>
              {rapidinesPorFecha.slice(0, 4).map((rapidin) => (
                <li key={rapidin.id}>
                  <p>
                    <strong>Fecha:</strong> {rapidin.fecha}
                  </p>
                  <p>
                    <strong>Domiciliario:</strong> {rapidin.nombreDomiciliario}
                  </p>
                  <p>
                    <strong>Total domiciliario:</strong> $
                    {rapidin.totalDomiciliario.toLocaleString()}
                  </p>
                  <p>
                    <strong>Total ingreso:</strong> $
                    {rapidin.totalIngreso.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay rapidines para esta fecha.</p>
          )}
        </div>
        <h2>Solo hacer al empezar un nuevo dia</h2>
        {/* Botones de reset */}
        <div className="botones-reset">
          <button
            onClick={() => setMostrarModalResetRapidin(true)}
            className="boton-reset"
          >
            Resetear Rapidines
          </button>
          <button
            onClick={() => setMostrarModalResetDomiciliarios(true)}
            className="boton-reset"
          >
            Resetear Totales Domiciliarios
          </button>
        </div>
      </div>

      {/* Sección derecha: Rapidines actuales y acciones */}
      <div className="seccion-derecha">
        <h2>Rapidines actuales</h2>
        <div className="rapidines-actuales">
          {rapidinesActuales.length > 0 ? (
            <ul>
              {rapidinesActuales.map((rapidin) => (
                <li key={rapidin.id}>
                  <p>
                    <strong>Fecha:</strong> {rapidin.fecha}
                  </p>
                  <p>
                    <strong>Domiciliario:</strong> {rapidin.nombreDomiciliario}
                  </p>
                  <p>
                    <strong>Total domiciliario:</strong> $
                    {rapidin.totalDomiciliario.toLocaleString()}
                  </p>
                  <p>
                    <strong>Total ingreso:</strong> $
                    {rapidin.totalIngreso.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay rapidines para hoy.</p>
          )}
        </div>

        {/* Total generado hoy */}
        <div className="total-generado-hoy">
          <h3>Total generado hoy:</h3>
          <p>${totalGeneradoHoy.toLocaleString()}</p>
        </div>
      </div>

      {/* Modal para resetear rapidines */}
      {mostrarModalResetRapidin && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¿Estás seguro de resetear los rapidines?</h2>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modal-botones">
              <button onClick={handleResetRapidin} className="boton-confirmar">
                Sí, resetear
              </button>
              <button
                onClick={() => setMostrarModalResetRapidin(false)}
                className="boton-cancelar"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para resetear totales de domiciliarios */}
      {mostrarModalResetDomiciliarios && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¿Estás seguro de resetear los totales de domiciliarios?</h2>
            <p>Esta acción es delicada y no se puede deshacer.</p>
            <div className="modal-botones">
              <button
                onClick={handleResetDomiciliarios}
                className="boton-confirmar"
              >
                Sí, resetear
              </button>
              <button
                onClick={() => setMostrarModalResetDomiciliarios(false)}
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

export default Rapidin;
