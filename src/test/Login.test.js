// src/test/Login.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';

test('renders login form for Happy Pets', () => {
  render(
    <div className="login-form">
      <h2>Iniciar Sesión</h2>
      <form>
        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" id="email" placeholder="usuario@ejemplo.com" />
        
        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" placeholder="Ingresa tu contraseña" />
        
        <button type="submit">Ingresar</button>
      </form>
      <p>¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
    </div>
  );
  
  expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
  expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
  expect(screen.getByText('Ingresar')).toBeInTheDocument();
  expect(screen.getByText('Regístrate aquí')).toBeInTheDocument();
});