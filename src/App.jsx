import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import { AuthProvider } from './context/AuthContext';
import Producto from './pages/Producto';
import Carrito from './pages/Carrito';
import Registro from './pages/Registro';
import Inicio from './pages/Inicio';
import Inicio_user from './pages/Inicio_user';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/inicio-user" element={<Inicio_user />} />
              <Route path="/productos" element={<Producto />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/registro" element={<Registro />} />
            </Routes>
          </div>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;