import React, { createContext, useState, useContext } from 'react';
import { ventaService } from '../services/ventaService';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [productoParaRegistro, setProductoParaRegistro] = useState(null);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const actualizarCantidad = (productId, nuevaCantidad) => {
    setCarrito(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  const eliminarDelCarrito = (productId) => {
    setCarrito(prev => prev.filter(item => item.id !== productId));
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const obtenerTotal = () => {
    return carrito.reduce((total, item) => total + (item.precioNumerico * item.cantidad), 0);
  };

  const guardarProductoParaRegistro = (productoInfo) => {
    setProductoParaRegistro(productoInfo);
  };

  const limpiarProductoRegistro = () => {
    setProductoParaRegistro(null);
  };

  // Nueva función para procesar compra con el backend
  const procesarCompra = async (datosPago) => {
    try {
      const ventaData = {
        items: carrito.map(item => ({
          productoId: item.id,
          cantidad: item.cantidad,
          precioUnitario: item.precioNumerico
        })),
        total: obtenerTotal(),
        datosPago: datosPago,
        direccionEnvio: datosPago.direccionEnvio
      };

      const resultado = await ventaService.crearVenta(ventaData);
      limpiarCarrito();
      return resultado;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    carrito,
    productoParaRegistro,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    limpiarCarrito,
    obtenerTotal,
    guardarProductoParaRegistro,
    limpiarProductoRegistro,
    procesarCompra
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

export { CarritoContext };