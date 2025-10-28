import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navegacion from '../src/components/Navegacion';

describe('Componente de Navegación', () => {
  
  const renderConRouter = (componente) => {
    return render(<BrowserRouter>{componente}</BrowserRouter>);
  };

  it('debe mostrar todos los enlaces de navegación', () => {
    renderConRouter(<Navegacion />);
    
    expect(screen.getByText(/hogar/i)).toBeInTheDocument();
    expect(screen.getByText(/catálogo/i)).toBeInTheDocument();
    expect(screen.getByText(/carrito/i)).toBeInTheDocument();
    expect(screen.getByText(/registro/i)).toBeInTheDocument();
  });

  it('debe mostrar el logo de Happy Pets', () => {
    renderConRouter(<Navegacion />);
    
    const logo = screen.getByAltText(/logo de happypets/i);
    expect(logo).toBeInTheDocument();
  });

  it('debe mostrar contador del carrito cuando hay productos', () => {
    renderConRouter(<Navegacion cantidadCarrito={5} />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('debe resaltar la página activa', () => {
    renderConRouter(<Navegacion paginaActiva="carrito" />);
    
    const enlaceCarrito = screen.getByText(/carrito/i);
    expect(enlaceCarrito).toHaveClass('active');
  });
});