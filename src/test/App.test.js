import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('Componente Principal App - Happy Pets', () => {
  
  it('debe renderizar la aplicación sin errores', () => {
    const { container } = render(<App />);
    expect(container).toBeDefined();
  });

  it('debe contener el logo de Happy Pets', () => {
    render(<App />);
    const logo = screen.getByAltText(/logo de happy pets/i);
    expect(logo).toBeInTheDocument();
  });

  it('debe tener enlaces de navegación', () => {
    render(<App />);
    const enlaceHogar = screen.getByText(/hogar/i);
    const enlaceCatalogo = screen.getByText(/catálogo/i);
    const enlaceCarrito = screen.getByText(/carrito/i);
    
    expect(enlaceHogar).toBeInTheDocument();
    expect(enlaceCatalogo).toBeInTheDocument();
    expect(enlaceCarrito).toBeInTheDocument();
  });
});