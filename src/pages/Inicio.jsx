import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/Pruebas.css';
import LogoHappyPets from '../assets/img/LogoHappyPets.png';
import LocalImage from '../assets/img/local.png';
import AboutImage from '../assets/img/images.avif';
import FacebookIcon from '../assets/img/facebook.png';
import InstagramIcon from '../assets/img/instagram.png';
import TwitterIcon from '../assets/img/twitter.png';

const Inicio = () => {
  const { usuario } = useContext(AuthContext);

  return (
    <div className="home-page">
      <header>
        <div className="logo-container">
          <img src={LogoHappyPets} alt="Logo de HappyPets" className="logo" />
        </div>

      <nav className="menu-superior">
  <ul>
    <li><Link to="/" className="active">Hogar</Link></li>
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
        <section className="hero">
          <div className="hero-text">
            <h2>Bienvenido a Happy Pets</h2>
            <p>En Happy Pets, encontrarás todo lo que tu mejor amigo necesita para ser feliz. ❤️🐶</p>
            <Link to="/productos" className="btn-hero">
              Ver productos
            </Link>
          </div>
          <div className="hero-image">
            <img src={LocalImage} alt="Perro feliz" />
          </div>
        </section>

        <section className="acerca-de">
          <div className="acerca-contenido">
            <div className="acerca-texto-contenedor">
              <div className="texto-recuadro">
                <h2>Acerca de Happy Pets</h2>
                <p className="texto-grande">
                  En Happy Pets nos apasiona conectar a las personas con sus compañeros caninos ideales. 
                  Nuestro objetivo es ofrecer una experiencia confiable y alegre para todos los amantes de los perros.
                </p>
                <p className="texto-grande">
                  Ofrecemos productos de alta calidad, alimentos nutritivos y accesorios que harán 
                  la vida de tu mascota más feliz y cómoda.
                </p>
              </div>
            </div>
            <div className="acerca-imagen">
              <img src={AboutImage} alt="Perros felices" />
            </div>
          </div>
        </section>
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

export default Inicio;