import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/Pruebas.css';
import LogoHappyPets from '../assets/img/LogoHappyPets.png';
import FacebookIcon from '../assets/img/facebook.png';
import InstagramIcon from '../assets/img/instagram.png';
import TwitterIcon from '../assets/img/twitter.png';

const InicioUser = () => {
  const { usuario } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));

    validateField(id, value);
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'correo':
        if (!value.includes('@')) {
          newErrors.correo = "El correo debe contener '@', '.com', '.cl' o ingresar un correo valido.";
        } else {
          delete newErrors.correo;
        }
        break;
      
      case 'contraseña':
        if (value.length < 8) {
          newErrors.contraseña = "La clave debe tener al menos 8 caracteres.";
        } else {
          delete newErrors.contraseña;
        }
        break;
      
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.keys(errors).length > 0 || !formData.correo.includes('@') || formData.contraseña.length < 8) {
      alert("Por favor, corrige los errores antes de continuar.");
      return;
    }

    console.log('Inicio de sesión exitoso:', formData);
    alert('¡Inicio de sesión exitoso!');
  };

  return (
    <div className="inicio-user-page">
      <header>
        <div className="logo-container">
          <img src={LogoHappyPets} alt="Logo de HappyPets" className="logo" />
        </div>

        <nav className="menu-superior">
  <ul>
    <li><Link to="/">Hogar</Link></li>
    <li><Link to="/productos">Catálogo</Link></li>
    <li><Link to="/carrito">Carrito</Link></li>
    {/* Solo muestra Registro si NO hay usuario */}
    {!usuario && <li><Link to="/registro">Registro</Link></li>}
    <li><Link to="/perfil">Mi Perfil</Link></li>
    {/* Solo muestra saludo si hay usuario autenticado */}
    {usuario && <li>Hola, {usuario.nombre}</li>}
  </ul>
</nav>
      </header>

      <main>
        <div className="card">
          <h2>Iniciar Sesión</h2>
          <form id="loginForm" onSubmit={handleSubmit}>
            <label htmlFor="correo">Correo:</label>
            <input 
              type="text" 
              id="correo" 
              placeholder="Ingresa tu correo" 
              value={formData.correo}
              onChange={handleInputChange}
              required 
            />
            <span id="correoError" className="error" style={{color: 'red'}}>
              {errors.correo}
            </span>
            <br /><br />

            <label htmlFor="contraseña">Contraseña:</label>
            <input 
              type="password" 
              id="contraseña" 
              placeholder="Ingresa tu contraseña" 
              value={formData.contraseña}
              onChange={handleInputChange}
              required 
            />
            <span id="contraseñaError" className="error" style={{color: 'red'}}>
              {errors.contraseña}
            </span>
            <br /><br />

            <button type="submit">Ingresar</button>
          </form>

          <p className="link">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
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

export default InicioUser;