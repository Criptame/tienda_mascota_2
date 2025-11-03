// src/test/Registro.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';

test('renders registration form elements', () => {
  render(
    <div>
      <h2>Registro de Usuario</h2>
      <form>
        <label htmlFor="correo">Correo:</label>
        <input type="email" id="correo" placeholder="Ingresa tu correo" />
        
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" placeholder="Ingresa tu nombre" />
        
        <label htmlFor="apellido">Apellido:</label>
        <input type="text" id="apellido" placeholder="Ingresa tu apellido" />
        
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
  
  expect(screen.getByText('Registro de Usuario')).toBeInTheDocument();
  expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
  expect(screen.getByText('Registrarse')).toBeInTheDocument();
});