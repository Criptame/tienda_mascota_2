import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Registro from '../src/components/Registro';

describe('Formulario de Registro de Usuario', () => {
  
  it('debe renderizar todos los campos del formulario', () => {
    render(<Registro />);
    
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
  });

  it('debe validar formato de correo electrónico', async () => {
    render(<Registro />);
    
    const inputCorreo = screen.getByLabelText(/correo/i);
    fireEvent.change(inputCorreo, { target: { value: 'correo-invalido' } });
    fireEvent.blur(inputCorreo);
    
    await waitFor(() => {
      expect(screen.getByText(/el correo debe contener '@'/i)).toBeInTheDocument();
    });
  });

  it('debe validar que la contraseña tenga al menos 8 caracteres', async () => {
    render(<Registro />);
    
    const inputPassword = screen.getByLabelText(/contraseña/i);
    fireEvent.change(inputPassword, { target: { value: '123' } });
    fireEvent.blur(inputPassword);
    
    await waitFor(() => {
      expect(screen.getByText(/la contraseña debe tener al menos 8 caracteres/i)).toBeInTheDocument();
    });
  });

  it('debe validar que las contraseñas coincidan', async () => {
    render(<Registro />);
    
    const inputPassword = screen.getByLabelText(/contraseña/i);
    const inputConfirmPassword = screen.getByLabelText(/confirmar contraseña/i);
    
    fireEvent.change(inputPassword, { target: { value: 'password123' } });
    fireEvent.change(inputConfirmPassword, { target: { value: 'password456' } });
    fireEvent.blur(inputConfirmPassword);
    
    await waitFor(() => {
      expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });

  it('debe enviar el formulario con datos válidos', async () => {
    const mockOnSubmit = jasmine.createSpy('onSubmit');
    
    render(<Registro onSubmit={mockOnSubmit} />);
    
    // Llenar formulario con datos válidos
    fireEvent.change(screen.getByLabelText(/correo/i), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/nombre/i), { 
      target: { value: 'Juan' } 
    });
    fireEvent.change(screen.getByLabelText(/apellido/i), { 
      target: { value: 'Pérez' } 
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { 
      target: { value: 'password123' } 
    });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { 
      target: { value: 'password123' } 
    });
    
    const botonRegistrar = screen.getByText(/registrarse/i);
    fireEvent.click(botonRegistrar);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        correo: 'test@example.com',
        nombre: 'Juan',
        apellido: 'Pérez',
        contraseña: 'password123'
      });
    });
  });
});