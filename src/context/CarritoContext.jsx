import React, { createContext, useState, useContext } from 'react';

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

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(prevCarrito => {
      const existe = prevCarrito.find(item => item.id === producto.id);
      
      if (existe) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad }];
      }
    });
  };

  const actualizarCantidad = (productId, nuevaCantidad) => {
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === productId
          ? { ...item, cantidad: Math.max(1, nuevaCantidad) }
          : item
      )
    );
  };

  const eliminarDelCarrito = (productId) => {
    setCarrito(prevCarrito =>
      prevCarrito.filter(item => item.id !== productId)
    );
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const obtenerTotal = () => {
    return carrito.reduce((total, item) => total + (item.precioNumerico * item.cantidad), 0);
  };

  const obtenerCantidadTotal = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  const value = {
    carrito,
    agregarAlCarrito,
    actualizarCantidad,
    eliminarDelCarrito,
    limpiarCarrito,
    obtenerTotal,
    obtenerCantidadTotal
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

export { CarritoContext };