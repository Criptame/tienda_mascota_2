import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CarritoProvider } from './context/CarritoContext';
import Inicio from './pages/Inicio';
import Producto from './pages/Producto';
import Carrito from './pages/Carrito';
import Registro from './pages/Registro';
import Perfil from './pages/Perfil';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/productos" element={<Producto />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;