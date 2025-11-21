import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';
import '../assets/css/Perfil.css';

// Importar imágenes
import LogoHappyPets from '../assets/img/LogoHappyPets.png';
import FacebookIcon from '../assets/img/facebook.png';
import InstagramIcon from '../assets/img/instagram.png';
import TwitterIcon from '../assets/img/twitter.png';

const Perfil = () => {
  const navigate = useNavigate();
  const { usuario, actualizarPerfil, cerrarSesion } = useContext(AuthContext);
  const { carrito, obtenerTotal } = useContext(CarritoContext);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  // Simular historial de compras
  const [historialCompras, setHistorialCompras] = useState([
    {
      id: 1,
      fecha: '2024-01-15',
      productos: ['Comida Para Perros', 'Juguete Para Perros'],
      total: 34500,
      estado: 'Completado'
    },
    {
      id: 2,
      fecha: '2024-01-10',
      productos: ['Alimento Premium Gatos'],
      total: 18500,
      estado: 'Completado'
    }
  ]);

  useEffect(() => {
    if (!usuario) {
      navigate('/registro');
      return;
    }

    // Cargar datos del usuario en el formulario
    setFormData({
      nombre: usuario.nombre || '',
      email: usuario.email || '',
      telefono: usuario.telefono || '',
      direccion: usuario.direccion || ''
    });
  }, [usuario, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGuardarPerfil = (e) => {
    e.preventDefault();
    actualizarPerfil(formData);
    setEditando(false);
    alert('Perfil actualizado correctamente');
  };

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate('/');
  };

  if (!usuario) {
    return (
      <div className="perfil-page">
        <div className="no-autenticado">
          <h2>Debes iniciar sesión para ver tu perfil</h2>
          <Link to="/registro" className="btn-primario">Iniciar Sesión / Registrarse</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-page">
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
    {/* En perfil, mostramos el texto activo pero sin Link */}
    <li><span className="active">Mi Perfil</span></li>
    {/* Solo muestra saludo si hay usuario */}
    {usuario && <li>Hola, {usuario.nombre}</li>}
  </ul>
</nav>
      </header>

      <main className="perfil-main">
        <div className="perfil-header">
          <h1>Mi Perfil</h1>
          <p>Gestiona tu información personal y revisa tu historial de compras</p>
        </div>

        <div className="perfil-contenedor">
          {/* Sección de Información Personal */}
          <section className="perfil-seccion">
            <div className="seccion-header">
              <h2>Información Personal</h2>
              <button 
                className="btn-editar"
                onClick={() => setEditando(!editando)}
              >
                {editando ? 'Cancelar' : 'Editar'}
              </button>
            </div>

            {editando ? (
              <form onSubmit={handleGuardarPerfil} className="formulario-perfil">
                <div className="form-group">
                  <label>Nombre completo:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Correo electrónico:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Teléfono:</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="+56 9 1234 5678"
                  />
                </div>

                <div className="form-group">
                  <label>Dirección:</label>
                  <textarea
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu dirección completa"
                    rows="3"
                  />
                </div>

                <button type="submit" className="btn-guardar">
                  Guardar Cambios
                </button>
              </form>
            ) : (
              <div className="info-perfil">
                <div className="info-item">
                  <strong>Nombre:</strong>
                  <span>{usuario.nombre}</span>
                </div>
                <div className="info-item">
                  <strong>Email:</strong>
                  <span>{usuario.email}</span>
                </div>
                <div className="info-item">
                  <strong>Teléfono:</strong>
                  <span>{usuario.telefono || 'No especificado'}</span>
                </div>
                <div className="info-item">
                  <strong>Dirección:</strong>
                  <span>{usuario.direccion || 'No especificada'}</span>
                </div>
                <div className="info-item">
                  <strong>Miembro desde:</strong>
                  <span>{new Date(usuario.fechaRegistro).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </section>

          {/* Sección de Carrito Actual */}
          <section className="perfil-seccion">
            <h2>Carrito Actual</h2>
            {carrito.length === 0 ? (
              <p>Tu carrito está vacío</p>
            ) : (
              <div className="carrito-resumen">
                <p><strong>Productos en carrito:</strong> {carrito.length}</p>
                <p><strong>Total:</strong> ${obtenerTotal().toLocaleString()}</p>
                <Link to="/carrito" className="btn-primario">
                  Ver Carrito Completo
                </Link>
              </div>
            )}
          </section>

          {/* Sección de Historial de Compras */}
          <section className="perfil-seccion">
            <h2>Historial de Compras</h2>
            {historialCompras.length === 0 ? (
              <p>No tienes compras anteriores</p>
            ) : (
              <div className="historial-compras">
                {historialCompras.map(compra => (
                  <div key={compra.id} className="compra-item">
                    <div className="compra-header">
                      <span className="compra-fecha">
                        {new Date(compra.fecha).toLocaleDateString()}
                      </span>
                      <span className={`compra-estado ${compra.estado.toLowerCase()}`}>
                        {compra.estado}
                      </span>
                    </div>
                    <div className="compra-productos">
                      <strong>Productos:</strong> {compra.productos.join(', ')}
                    </div>
                    <div className="compra-total">
                      <strong>Total:</strong> ${compra.total.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Botón de Cerrar Sesión */}
          <div className="acciones-perfil">
            <button 
              onClick={handleCerrarSesion}
              className="btn-cerrar-sesion"
            >
              Cerrar Sesión
            </button>
          </div>
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
              <li><Link to="/perfil">Mi Perfil</Link></li>
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

export default Perfil;