import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import LerFilme from './pages/LerFilme';
import CriarFilme from './pages/CriarFilme';
import EditarFilme from './pages/EditarFilme';
import ApagarFilme from './pages/ApagarFilme';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/filme/:id" element={<LerFilme />} />
          <Route path="/criar" element={<CriarFilme />} />
          <Route path="/editar/:id" element={<EditarFilme />} />
          <Route path="/apagar/:id" element={<ApagarFilme />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
