import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

// Test básico para verificar que React funciona
test('renders without crashing', () => {
  render(<App />);
});

test('contains Happy Pets text', () => {
  render(<App />);
  const linkElement = screen.getByText(/happy pets/i);
  expect(linkElement).toBeInTheDocument();
});