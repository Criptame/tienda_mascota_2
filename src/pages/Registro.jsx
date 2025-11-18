import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';
import '../assets/css/Pruebas.css';
import LogoHappyPets from '../assets/img/LogoHappyPets.png';
import FacebookIcon from '../assets/img/facebook.png';
import InstagramIcon from '../assets/img/instagram.png';
import TwitterIcon from '../assets/img/twitter.png';

const Registro = () => {
  const navigate = useNavigate();
  const { registrarUsuario, iniciarSesion, usuario } = useContext(AuthContext);
  const { productoParaRegistro, agregarAlCarrito, limpiarProductoRegistro } = useContext(CarritoContext);
  
  const [esLogin, setEsLogin] = useState(false);
  const [formData, setFormData] = useState({
    correo: '',
    nombre: '',
    apellido: '',
    contraseña: '',
    confirmar_contraseña: ''
  });

  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState('');

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
      
      case 'confirmar_contraseña':
        if (value !== formData.contraseña) {
          newErrors.confirmar_contraseña = "Las contraseñas no coinciden.";
        } else {
          delete newErrors.confirmar_contraseña;
        }
        break;
      
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    
    if (Object.keys(errors).length > 0 || !formData.correo.includes('@') || formData.contraseña.length < 8) {
      setMensaje("Por favor, corrige los errores antes de continuar.");
      return;
    }

    try {
      if (esLogin) {
        // Simular inicio de sesión
        const usuarioSimulado = {
          id: Date.now(),
          nombre: formData.nombre || formData.correo.split('@')[0],
          apellido: formData.apellido || '',
          email: formData.correo,
          fechaRegistro: new Date().toISOString()
        };
        
        iniciarSesion(usuarioSimulado, 'token-simulado-login');
        setMensaje('¡Inicio de sesión exitoso!');
      } else {
        // Validar contraseñas para registro
        if (formData.contraseña !== formData.confirmar_contraseña) {
          setMensaje("Las contraseñas no coinciden.");
          return;
        }

        // Registrar usuario
        await registrarUsuario({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.correo,
          password: formData.contraseña
        });
        setMensaje('¡Registro exitoso!');
      }

      // Si hay un producto pendiente, agregarlo al carrito después de un breve delay
      if (productoParaRegistro) {
        setTimeout(() => {
          const { producto, accion, cantidad } = productoParaRegistro;
          const productoConPrecio = {
            ...producto,
            precioNumerico: parseFloat(producto.price.replace('$', '').replace('.', ''))
          };
          
          agregarAlCarrito(productoConPrecio, cantidad);
          
          // Redirigir según la acción
          if (accion === 'comprarAhora') {
            navigate('/carrito');
          } else {
            navigate('/productos');
          }
          
          limpiarProductoRegistro();
        }, 1500);
      } else {
        // Si no hay producto pendiente, ir al catálogo
        setTimeout(() => navigate('/productos'), 1500);
      }
      
    } catch (error) {
      setMensaje('Error: ' + error.message);
    }
  };

  return (
    <div className="registro-page">
      <header>
        <div className="logo-container">
          <img src={LogoHappyPets} alt="Logo de HappyPets" className="logo" />
        </div>

        <nav className="menu-superior">
          <ul>
            <li><Link to="/">Hogar</Link></li>
            <li><Link to="/productos">Catálogo</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/registro" className="active">Registro</Link></li>
            <li><Link to="/perfil">Mi Perfil</Link></li>
            <li>{usuario ? `Hola, ${usuario.nombre}` : 'Invitado'}</li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="card">
          <h2>{esLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>

          {/* Mostrar información del producto si viene del catálogo */}
          {productoParaRegistro && (
            <div className="producto-pendiente-info">
              <h3>¡Estás a un paso de obtener tu producto!</h3>
              <p><strong>Producto:</strong> {productoParaRegistro.producto.name}</p>
              <p><strong>Precio:</strong> {productoParaRegistro.producto.price}</p>
              <p><strong>Cantidad:</strong> {productoParaRegistro.cantidad}</p>
              <p>Completa tu {esLogin ? 'inicio de sesión' : 'registro'} para continuar con la compra.</p>
            </div>
          )}

          {mensaje && (
            <div className={`mensaje ${mensaje.includes('éxito') || mensaje.includes('exito') ? 'exito' : 'error'}`}>
              {mensaje}
            </div>
          )}

          <form id="loginForm" onSubmit={handleSubmit}>
            {!esLogin && (
              <>
                <label htmlFor="nombre">Nombre:</label>
                <input 
                  type="text" 
                  id="nombre" 
                  placeholder="Ingresa tu nombre" 
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required 
                />
                <span id="nombreError" className="error"></span>
                <br /><br />

                <label htmlFor="apellido">Apellido:</label>
                <input 
                  type="text" 
                  id="apellido" 
                  placeholder="Ingresa tu apellido" 
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required 
                />
                <span id="apellidoError" className="error"></span>
                <br /><br />
              </>
            )}

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

            {!esLogin && (
              <>
                <label htmlFor="confirmar_contraseña">Confirmar Contraseña:</label>
                <input 
                  type="password" 
                  id="confirmar_contraseña" 
                  placeholder="Verifica tu contraseña" 
                  value={formData.confirmar_contraseña}
                  onChange={handleInputChange}
                  required 
                />
                <span id="confirmar_contraseñaError" className="error" style={{color: 'red'}}>
                  {errors.confirmar_contraseña}
                </span>
                <br /><br />
              </>
            )}
    
            <button type="submit">{esLogin ? 'Iniciar Sesión' : 'Registrarse'}</button>
          </form>

          <p className="link">
            {esLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'} 
            <span 
              onClick={() => setEsLogin(!esLogin)} 
              style={{color: '#007bff', cursor: 'pointer', marginLeft: '5px'}}
            >
              {esLogin ? ' Regístrate aquí' : ' Inicia sesión aquí'}
            </span>
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
              <li><Link to="/perfil">Mi Perfil</Link></li>
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

export default Registro;