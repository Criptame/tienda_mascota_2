// src/test/Carrito.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';

test('renders shopping cart with products', () => {
  const productos = [
    { nombre: 'Juguete Para Perros', precio: 12500, cantidad: 2 },
    { nombre: 'Cama Para Perros', precio: 33000, cantidad: 1 }
  ];

  render(
    <div className="carrito">
      <h2>Carrito de Compras</h2>
      {productos.map((producto, index) => (
        <div key={index} className="producto-carrito">
          <span>{producto.nombre}</span>
          <span>${producto.precio.toLocaleString()}</span>
          <span>Cantidad: {producto.cantidad}</span>
        </div>
      ))}
      <button>Finalizar Compra</button>
    </div>
  );
  
  expect(screen.getByText('Carrito de Compras')).toBeInTheDocument();
  expect(screen.getByText('Juguete Para Perros')).toBeInTheDocument();
  expect(screen.getByText('$12.500')).toBeInTheDocument(); // ← CAMBIADO: 12,500 → 12.500
  expect(screen.getByText('Cama Para Perros')).toBeInTheDocument();
  expect(screen.getByText('$33.000')).toBeInTheDocument(); // ← AGREGADO
  expect(screen.getByText('Cantidad: 2')).toBeInTheDocument(); // ← AGREGADO
  expect(screen.getByText('Cantidad: 1')).toBeInTheDocument(); // ← AGREGADO
  expect(screen.getByText('Finalizar Compra')).toBeInTheDocument();
});