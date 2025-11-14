import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Pruebas.css';
import LogoHappyPets from '../assets/img/LogoHappyPets.png';
import FacebookIcon from '../assets/img/facebook.png';
import InstagramIcon from '../assets/img/instagram.png';
import TwitterIcon from '../assets/img/twitter.png';

const Carrito = () => {
  const [formData, setFormData] = useState({
    producto: '',
    cantidad: 1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pedido enviado:', formData);
    alert(`Pedido enviado: ${formData.cantidad} x ${formData.producto}`);
  };

  return (
    <div className="carrito-page">
      <header>
        <div className="logo-container">
          <img src={LogoHappyPets} alt="Logo de HappyPets" className="logo" />
        </div>

        <nav className="menu-superior">
          <ul>
            <li><Link to="/">Hogar</Link></li>
            <li><Link to="/productos">Catálogo</Link></li>
            <li><Link to="/carrito" className="active">Carrito</Link></li>
            <li><Link to="/registro">Registro</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="card">
          <h2>Formulario de pedidos</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Producto:
              <input 
                type="text" 
                name="producto" 
                placeholder="Ej: Juguetes"
                value={formData.producto}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Cantidad:
              <input 
                type="number" 
                name="cantidad" 
                min="1"
                value={formData.cantidad}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Enviar Pedido</button>
          </form>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-contenedor">
          <div className="footer-seccion">
            <h3>Happy Pets</h3>
            <p>Tu tienda de confianza para consentir a tu mascota. Productos de calidad y el mejor servicio.</p>
          </div>

          <div className="footer-seccion">
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Catálogo</Link></li>
              <li><Link to="/carrito">Carrito</Link></li>
              <li><Link to="/registro">Registro</Link></li>
            </ul>
          </div>

          <div className="footer-seccion">
            <h3>Contáctanos</h3>
            <p>Email: contacto@happypets.com</p>
            <p>Tel: +56 9 1234 5678</p>
          </div>

          <div className="footer-seccion Localizacion">
            <p>!!Estamos en Av. Principal #123, Santiago!!.</p>
            <p>Horario: Lunes a Sábado, 7:00 am - 8:00 pm</p>
          </div>

          <div className="footer-seccion redes">
            <h3>Síguenos</h3>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img src={FacebookIcon} alt="Facebook" />
            </a> 
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src={InstagramIcon} alt="Instagram" />
            </a>
            <a href="https://x.com/?lang=es" target="_blank" rel="noopener noreferrer">
              <img src={TwitterIcon} alt="Twitter" />
            </a>
          </div>
        </div>

        <div className="footer-copy">
          <p>© 2025 Happy Pets. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Carrito;