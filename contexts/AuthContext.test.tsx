import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from './AuthContext';
import { useAuth } from './useAuth';

const TestComponent: React.FC = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <p data-testid="user">{user || 'No user logged in'}</p>
      <button onClick={() => login('testuser')} data-testid="login">Login</button>
      <button onClick={logout} data-testid="logout">Logout</button>
    </div>
  );
};

test('AuthContext provides default values', () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  expect(screen.getByTestId('user').textContent).toBe('No user logged in');
});

test('AuthContext allows login and logout', () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  const loginButton = screen.getByTestId('login');
  const logoutButton = screen.getByTestId('logout');
  const userDisplay = screen.getByTestId('user');

  loginButton.click();
  expect(userDisplay.textContent).toBe('testuser');

  logoutButton.click();
  expect(userDisplay.textContent).toBe('No user logged in');
});