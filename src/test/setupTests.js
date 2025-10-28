import '@testing-library/jest-dom';

// Configuración global para los tests
beforeEach(() => {
  // Limpiar todos los mocks antes de cada test
jest.clearAllMocks();
});

// Mock para localStorage
const localStorageMock = {
getItem: jest.fn(),
setItem: jest.fn(),
removeItem: jest.fn(),
clear: jest.fn(),
};

global.localStorage = localStorageMock;

// Mock para fetch/API calls
global.fetch = jest.fn();

// Configuración para Jasmine
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;