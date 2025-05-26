require('@testing-library/jest-dom');
const { configure } = require('@testing-library/react');
const { act } = require('react');

configure({ asyncWrapper: async (cb) => await act(cb) });

console.log('jsdom environment active:', typeof window !== 'undefined' && typeof document !== 'undefined');

global.window.matchMedia = global.window.matchMedia || function(query) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
};

global.ResizeObserver = global.ResizeObserver || class {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};