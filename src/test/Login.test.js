import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../src/components/Login';

describe('Componente de Inicio de Sesión', () => {
  
  it('debe renderizar el formulario de login', () => {
    render(<Login />);
    
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/ingresar/i)).toBeInTheDocument();
    expect(screen.getByText(/¿no tienes cuenta?/i)).toBeInTheDocument();
  });

  it('debe validar credenciales incorrectas', async () => {
    render(<Login />);
    
    const inputCorreo = screen.getByLabelText(/correo/i);
    const inputPassword = screen.getByLabelText(/contraseña/i);
    
    fireEvent.change(inputCorreo, { target: { value: 'correo@invalido' } });
    fireEvent.change(inputPassword, { target: { value: '123' } });
    
    const botonIngresar = screen.getByText(/ingresar/i);
    fireEvent.click(botonIngresar);
    
    await waitFor(() => {
      expect(screen.getByText(/el correo debe contener '@'/i)).toBeInTheDocument();
      expect(screen.getByText(/la contraseña debe tener al menos 8 caracteres/i)).toBeInTheDocument();
    });
  });

  it('debe permitir login con credenciales válidas', async () => {
    const mockOnLogin = jasmine.createSpy('onLogin');
    
    render(<Login onLogin={mockOnLogin} />);
    
    fireEvent.change(screen.getByLabelText(/correo/i), { 
      target: { value: 'usuario@valido.com' } 
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { 
      target: { value: 'password123' } 
    });
    
    const botonIngresar = screen.getByText(/ingresar/i);
    fireEvent.click(botonIngresar);
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith({
        correo: 'usuario@valido.com',
        contraseña: 'password123'
      });
    });
  });

  it('debe mostrar enlace para registro', () => {
    render(<Login />);
    
    const enlaceRegistro = screen.getByText(/regístrate aquí/i);
    expect(enlaceRegistro).toBeInTheDocument();
    expect(enlaceRegistro.closest('a')).toHaveAttribute('href', 'Registro_User.html');
  });
});