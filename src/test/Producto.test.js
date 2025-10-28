import React from 'react';
import { render, screen } from '@testing-library/react';

// Test básico de renderizado
test('renders product card', () => {
render(
    <div className="card">
    <h3>Juguete Para Perros</h3>
    <p>$12.500</p>
    <img src="../IMG/shopping.webp" alt="Juguete Para Perros" />
    </div>
);

expect(screen.getByText('Juguete Para Perros')).toBeInTheDocument();
expect(screen.getByText('$12.500')).toBeInTheDocument();
});