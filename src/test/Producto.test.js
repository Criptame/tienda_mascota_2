import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Producto from '../src/components/Producto';

describe('Componente de Producto', () => {
const productoMock = {
    id: 1,
    nombre: 'Juguete Para Perros',
    precio: 12500,
    imagen: 'shopping.webp',
    descripcion: 'Juguete interactivo para perros'
};

it('debe mostrar la información del producto correctamente', () => {
    render(<Producto producto={productoMock} />);
    
    expect(screen.getByText('Juguete Para Perros')).toBeInTheDocument();
    expect(screen.getByText('$12.500')).toBeInTheDocument();
    expect(screen.getByAltText('Juguete Para Perros')).toBeInTheDocument();
});

it('debe llamar la función onAgregarCarrito cuando se hace click', () => {
    const mockAgregarCarrito = jasmine.createSpy('agregarCarrito');
    
    render(
    <Producto
        producto={productoMock}
        onAgregarCarrito={mockAgregarCarrito}
    />
    );
    
    const boton = screen.getByText(/agregar al carrito/i);
    fireEvent.click(boton);
    
    expect(mockAgregarCarrito).toHaveBeenCalledWith(productoMock);
  });

  it('debe mostrar el botón de agregar deshabilitado si no hay stock', () => {
    const productoSinStock = { ...productoMock, stock: 0 };
    
    render(<Producto producto={productoSinStock} />);
    
    const boton = screen.getByText(/sin stock/i);
    expect(boton).toBeDisabled();
  });
});