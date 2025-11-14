import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Pruebas.css';
import LogoHappyPets from '../assets/img/LogoHappyPets.png';
import Juguete1 from '../assets/img/shopping.webp';
import Juguete2 from '../assets/img/wfaewfe(1).webp';
import Cama1 from '../assets/img/rewgwge.webp';
import Cama2 from '../assets/img/cama_premiun.webp';
import Comida1 from '../assets/img/download.jpg';
import Comida2 from '../assets/img/Comida.jpg';
import FacebookIcon from '../assets/img/facebook.png';
import InstagramIcon from '../assets/img/instagram.png';
import TwitterIcon from '../assets/img/twitter.png';

const Producto = () => {
  const products = [
    {
      id: 1,
      name: "Juguete Para Perros",
      price: "$12.500",
      images: [Juguete1, Juguete2]
    },
    {
      id: 2,
      name: "Cama Para Perros", 
      price: "$33.000",
      images: [Cama1, Cama2]
    },
    {
      id: 3,
      name: "Comida Para Perros",
      price: "$22.000", 
      images: [Comida1, Comida2]
    }
  ];

  return (
    <div className="producto-page">
      <header>
        <div className="logo-container">
          <img src={LogoHappyPets} alt="Logo de HappyPets" className="logo" />
        </div>

        <nav className="menu-superior">
          <ul>
            <li><Link to="/">Hogar</Link></li>
            <li><Link to="/productos" className="active">Catálogo</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/registro">Registro</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="productos">
          {products.map(product => (
            <div key={product.id} className="card">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <div className="product-images">
                {product.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ))}
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

export default Producto;