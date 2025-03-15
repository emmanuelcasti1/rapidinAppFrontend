import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Domiciliarios from './pages/Domiciliario';
import Domicilio from './pages/Domicilio';
import Rapidin from './pages/Rapidin';
import EditarDomiciliario from './pages/EditarDomiciliario';
import EliminarDomiciliario from './pages/EliminarDomiciliario';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          DOMICILIOS EL RAPIDIN
        </header>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/domicilio" element={<Domicilio />} />
          <Route path="/domiciliarios" element={<Domiciliarios />} />
          <Route path="/rapidin" element={<Rapidin />} />
          <Route path="/editarDomiciliario" element={<EditarDomiciliario />} />
          <Route path="/eliminarDomiciliario" element={<EliminarDomiciliario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;