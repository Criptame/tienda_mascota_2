import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Carrito from '../src/components/Carrito';

describe('Componente Carrito de Compras', () => {
  const productosCarrito = [
    {
      id: 1,
      nombre: 'Juguete Para Perros',
      precio: 12500,
      cantidad: 2,
      imagen: 'shopping.webp'
    },
    {
      id: 2, 
      nombre: 'Cama Para Perros',
      precio: 33000,
      cantidad: 1,
      imagen: 'cama_premiun.webp'
    }
  ];

  it('debe mostrar mensaje cuando el carrito está vacío', () => {
    render(<Carrito productos={[]} />);
    expect(screen.getByText(/carrito vacío/i)).toBeInTheDocument();
  });

  it('debe mostrar los productos del carrito', () => {
    render(<Carrito productos={productosCarrito} />);
    
    expect(screen.getByText('Juguete Para Perros')).toBeInTheDocument();
    expect(screen.getByText('Cama Para Perros')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Cantidad
  });

  it('debe calcular el total correctamente', () => {
    render(<Carrito productos={productosCarrito} />);
    
    const totalEsperado = (12500 * 2) + 33000;
    expect(screen.getByText(`Total: $${totalEsperado.toLocaleString()}`)).toBeInTheDocument();
  });

  it('debe llamar onEliminarProducto cuando se elimina un producto', () => {
    const mockEliminar = jasmine.createSpy('eliminarProducto');
    
    render(
      <Carrito 
        productos={productosCarrito} 
        onEliminarProducto={mockEliminar} 
      />
    );
    
    const botonesEliminar = screen.getAllByText(/eliminar/i);
    fireEvent.click(botonesEliminar[0]);
    
    expect(mockEliminar).toHaveBeenCalledWith(1);
  });

  it('debe llamar onActualizarCantidad cuando se cambia la cantidad', () => {
    const mockActualizar = jasmine.createSpy('actualizarCantidad');
    
    render(
      <Carrito 
        productos={productosCarrito} 
        onActualizarCantidad={mockActualizar} 
      />
    );
    
    const selectCantidad = screen.getAllByDisplayValue('2')[0];
    fireEvent.change(selectCantidad, { target: { value: '3' } });
    
    expect(mockActualizar).toHaveBeenCalledWith(1, 3);
  });
});