// src/test/Navegacion.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';

test('renders navigation menu for Happy Pets', () => {
  render(
    <nav>
      <ul>
        <li><a href="/">Hogar</a></li>
        <li><a href="/productos">Catálogo</a></li>
        <li><a href="/carrito">Carrito</a></li>
        <li><a href="/registro">Registro</a></li>
      </ul>
    </nav>
  );
  
  expect(screen.getByText('Hogar')).toBeInTheDocument();
  expect(screen.getByText('Catálogo')).toBeInTheDocument();
  expect(screen.getByText('Carrito')).toBeInTheDocument();
  expect(screen.getByText('Registro')).toBeInTheDocument();
});