import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Pruebas.css';

// Importar todas las imágenes del catálogo que existen
import LogoHappyPets from '../assets/img/LogoHappyPets.png';
import AlimentoCachorros from '../assets/img/Alimento Cachorros.webp';
import AlimentoPremiumGatos from '../assets/img/Alimento Premium Gatos.webp';
import ArenaSanitaria from '../assets/img/Arena Sanitaria.webp';
import CepilloMasajeador from '../assets/img/Cepillo Masajeador.webp';
import CollarLED from '../assets/img/Collar LED.webp';
import ComidaHumedaGatos from '../assets/img/Comida Húmeda Gatos.webp';
import Comida from '../assets/img/Comida.jpg';
import CorreaRetractil from '../assets/img/Correa Retráctil.webp';
import CortaunasProfesional from '../assets/img/Cortauñas Profesional.webp';
import Download from '../assets/img/download.jpg';
import FacebookIcon from '../assets/img/facebook.png';
import HuesoGoma from '../assets/img/Hueso de Goma.webp';
import InstagramIcon from '../assets/img/instagram.png';
import JabonNatural from '../assets/img/Jabón Natural Mascotas.webp';
import PelotaSonido from '../assets/img/Pelota con Sonido.webp';
import PlatoDobleAcero from '../assets/img/Plato Doble Acero.webp';
import RascadorGatos from '../assets/img/Rascador para Gatos.webp';
import RatonJuguete from '../assets/img/Ratón de Juguete.webp';
import ShampooAntipulgas from '../assets/img/Shampoo Antipulgas.webp';
import Shopping from '../assets/img/shopping.webp';
import SnacksDentales from '../assets/img/Snacks Dentales Perros.webp';
import Transportadora from '../assets/img/Transportadora Mascota.webp';
import TwitterIcon from '../assets/img/twitter.png';
import Wfaewfe from '../assets/img/wfaewfe(1).webp';

// Imágenes que causan error - usar placeholders o eliminar
// Si estas imágenes no existen, comentamos las líneas problemáticas
// import CamaPremium from '../assets/img/cama.premium.webp';
// import Rewgwgc from '../assets/img/rewgwgc.webp';

const Producto = () => {
  const navigate = useNavigate();
  const [cantidades, setCantidades] = useState({});

  const handleCantidadChange = (productId, cantidad) => {
    setCantidades(prev => ({
      ...prev,
      [productId]: Math.max(1, cantidad)
    }));
  };

  const handleAñadirCarrito = (product) => {
    const cantidad = cantidades[product.id] || 1;
    console.log(`Añadido al carrito: ${cantidad} x ${product.name}`);
    alert(`¡${cantidad} ${product.name}(s) añadido(s) al carrito!`);
  };

  const handleComprarAhora = (product) => {
    const cantidad = cantidades[product.id] || 1;
    console.log(`Compra directa: ${cantidad} x ${product.name}`);
    alert(`Redirigiendo al carrito con ${cantidad} ${product.name}(s)`);
    navigate('/carrito');
  };

  const products = [
    // Productos originales - usar imágenes disponibles
    {
      id: 1,
      name: "Juguete Para Perros",
      price: "$12.500",
      images: [Shopping, Wfaewfe],
      category: "Juguetes"
    },
    {
      id: 2,
      name: "Cama Para Perros", 
      price: "$33.000",
      images: [Shopping], // Usar imagen disponible temporalmente
      category: "Camas"
    },
    {
      id: 3,
      name: "Comida Para Perros",
      price: "$22.000", 
      images: [Download, Comida],
      category: "Alimentos"
    },

    // Nuevos productos - Alimentos
    {
      id: 4,
      name: "Alimento Premium Gatos",
      price: "$18.500",
      images: [AlimentoPremiumGatos],
      category: "Alimentos"
    },
    {
      id: 5,
      name: "Snacks Dentales Perros",
      price: "$8.900",
      images: [SnacksDentales],
      category: "Alimentos"
    },
    {
      id: 6,
      name: "Comida Húmeda Gatos",
      price: "$6.500",
      images: [ComidaHumedaGatos],
      category: "Alimentos"
    },
    {
      id: 7,
      name: "Alimento Cachorros",
      price: "$25.000",
      images: [AlimentoCachorros],
      category: "Alimentos"
    },

    // Nuevos productos - Juguetes
    {
      id: 8,
      name: "Pelota con Sonido",
      price: "$7.800",
      images: [PelotaSonido],
      category: "Juguetes"
    },
    {
      id: 9,
      name: "Hueso de Goma",
      price: "$5.500",
      images: [HuesoGoma],
      category: "Juguetes"
    },
    {
      id: 10,
      name: "Rascador para Gatos",
      price: "$15.000",
      images: [RascadorGatos],
      category: "Juguetes"
    },
    {
      id: 11,
      name: "Ratón de Juguete",
      price: "$3.200",
      images: [RatonJuguete],
      category: "Juguetes"
    },

    // Nuevos productos - Accesorios
    {
      id: 12,
      name: "Correa Retráctil",
      price: "$12.000",
      images: [CorreaRetractil],
      category: "Accesorios"
    },
    {
      id: 13,
      name: "Collar LED",
      price: "$9.800",
      images: [CollarLED],
      category: "Accesorios"
    },
    {
      id: 14,
      name: "Plato Doble Acero",
      price: "$11.500",
      images: [PlatoDobleAcero],
      category: "Accesorios"
    },
    {
      id: 15,
      name: "Transportadora Mascota",
      price: "$28.000",
      images: [Transportadora],
      category: "Accesorios"
    },

    // Nuevos productos - Higiene
    {
      id: 16,
      name: "Shampoo Antipulgas",
      price: "$8.500",
      images: [ShampooAntipulgas],
      category: "Higiene"
    },
    {
      id: 17,
      name: "Cepillo Masajeador",
      price: "$6.800",
      images: [CepilloMasajeador],
      category: "Higiene"
    },
    {
      id: 18,
      name: "Arena Sanitaria",
      price: "$7.200",
      images: [ArenaSanitaria],
      category: "Higiene"
    },
    {
      id: 19,
      name: "Cortauñas Profesional",
      price: "$5.900",
      images: [CortaunasProfesional],
      category: "Higiene"
    },
    {
      id: 20,
      name: "Jabón Natural Mascotas",
      price: "$4.500",
      images: [JabonNatural],
      category: "Higiene"
    }
  ];

  // Agrupar productos por categoría
  const productosPorCategoria = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

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
        <div className="catalogo-header">
          <h1>Nuestro Catálogo de Productos</h1>
          <p>Encuentra todo lo que tu mascota necesita</p>
        </div>

        {Object.entries(productosPorCategoria).map(([categoria, productos]) => (
          <section key={categoria} className="categoria-section">
            <h2 className="categoria-titulo">{categoria}</h2>
            <div className="productos-grid">
              {productos.map(product => (
                <div key={product.id} className="producto-card">
                  <div className="producto-images">
                    {product.images.map((image, index) => (
                      <img 
                        key={index} 
                        src={image} 
                        alt={`${product.name} ${index + 1}`}
                        className="producto-imagen"
                        onError={(e) => {
                          e.target.src = LogoHappyPets; // Fallback a logo si la imagen no carga
                        }}
                      />
                    ))}
                  </div>
                  <div className="producto-info">
                    <h3>{product.name}</h3>
                    <p className="producto-precio">{product.price}</p>
                    
                    <div className="cantidad-control">
                      <label>Cantidad:</label>
                      <input 
                        type="number" 
                        min="1"
                        value={cantidades[product.id] || 1}
                        onChange={(e) => handleCantidadChange(product.id, parseInt(e.target.value))}
                        className="cantidad-input"
                      />
                    </div>

                    <div className="producto-botones">
                      <button 
                        className="btn-añadir-carrito"
                        onClick={() => handleAñadirCarrito(product)}
                      >
                        🛒 Añadir al Carrito
                      </button>
                      <button 
                        className="btn-comprar-ahora"
                        onClick={() => handleComprarAhora(product)}
                      >
                        ⚡ Comprar Ahora
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
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