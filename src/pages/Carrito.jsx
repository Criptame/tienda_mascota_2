import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/Carrito.css';
import LogoHappyPets from '../assets/img/LogoHappyPets.png';
import FacebookIcon from '../assets/img/facebook.png';
import InstagramIcon from '../assets/img/instagram.png';
import TwitterIcon from '../assets/img/twitter.png';

const Carrito = () => {
  const { carrito, actualizarCantidad, eliminarDelCarrito, limpiarCarrito, obtenerTotal } = useContext(CarritoContext);
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [procesando, setProcesando] = useState(false);

  const handleCantidadChange = (productId, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      eliminarDelCarrito(productId);
    } else {
      actualizarCantidad(productId, nuevaCantidad);
    }
  };

  const handleProcesarCompra = () => {
    if (!usuario) {
      alert('Debes iniciar sesión para realizar compras');
      navigate('/registro');
      return;
    }

    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    setProcesando(true);
    
    // Simular proceso de compra
    setTimeout(() => {
      alert(`¡Compra realizada con éxito! Total: $${obtenerTotal().toLocaleString()}`);
      limpiarCarrito();
      setProcesando(false);
      navigate('/');
    }, 2000);
  };

  const formatoPrecio = (precio) => {
    return `$${precio.toLocaleString()}`;
  };

  if (!usuario) {
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
          <div className="carrito-vacio">
            <h2>Debes iniciar sesión para ver el carrito</h2>
            <p>Por favor, regístrate o inicia sesión para continuar con tu compra.</p>
            <Link to="/registro" className="btn-registro">
              Crear Cuenta / Iniciar Sesión
            </Link>
          </div>
        </main>
      </div>
    );
  }

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
            <li>Hola, {usuario.nombre}</li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="carrito-header">
          <h1>Tu Carrito de Compras</h1>
          <p>Revisa y modifica los productos antes de finalizar tu compra</p>
        </div>

        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <h2>Tu carrito está vacío</h2>
            <p>¡Descubre nuestros productos y consiente a tu mascota!</p>
            <Link to="/productos" className="btn-catalogo">
              Ver Catálogo
            </Link>
          </div>
        ) : (
          <div className="carrito-contenido">
            <div className="carrito-items">
              {carrito.map(item => (
                <div key={item.id} className="carrito-item">
                  <div className="item-imagen">
                    <img 
                      src={item.images[0]} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = LogoHappyPets;
                      }}
                    />
                  </div>
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="item-precio-unitario">
                      {formatoPrecio(item.precioNumerico)} c/u
                    </p>
                  </div>
                  <div className="item-cantidad">
                    <button 
                      onClick={() => handleCantidadChange(item.id, item.cantidad - 1)}
                      className="btn-cantidad"
                    >
                      -
                    </button>
                    <span className="cantidad-display">{item.cantidad}</span>
                    <button 
                      onClick={() => handleCantidadChange(item.id, item.cantidad + 1)}
                      className="btn-cantidad"
                    >
                      +
                    </button>
                  </div>
                  <div className="item-subtotal">
                    <p>{formatoPrecio(item.precioNumerico * item.cantidad)}</p>
                  </div>
                  <div className="item-eliminar">
                    <button 
                      onClick={() => eliminarDelCarrito(item.id)}
                      className="btn-eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="carrito-resumen">
              <h3>Resumen de Compra</h3>
              <div className="resumen-linea">
                <span>Subtotal:</span>
                <span>{formatoPrecio(obtenerTotal())}</span>
              </div>
              <div className="resumen-linea">
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              <div className="resumen-linea total">
                <span>Total:</span>
                <span>{formatoPrecio(obtenerTotal())}</span>
              </div>
              <button 
                onClick={handleProcesarCompra}
                disabled={procesando}
                className="btn-comprar"
              >
                {procesando ? 'Procesando...' : 'Finalizar Compra'}
              </button>
              <button 
                onClick={limpiarCarrito}
                className="btn-limpiar"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        )}
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

export default Carrito;