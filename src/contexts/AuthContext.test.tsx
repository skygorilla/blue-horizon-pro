import React from 'react'; // Ensure React is imported for JSX
import { render, screen, act } from '@testing-library/react';
import { AuthProvider } from './AuthContext';
import { useAuth } from './useAuth';

const mockUser = {
  id: '123',
  email: 'test@example.com',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
};

const TestComponent = () => {
  const { user, setUser, activeRole, setActiveRole } = useAuth();

  return (
    <div>
      <p data-testid="user">{user ? user.email : 'No user'}</p>
      <p data-testid="role">{activeRole || 'No role'}</p>
      <button onClick={() => setUser(mockUser)}>Set User</button>
      <button onClick={() => setActiveRole('manager')}>Set Role</button>
    </div>
  );
};

describe('AuthContext', () => {
  it('provides default values', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user').textContent).toBe('No user');
    expect(screen.getByTestId('role').textContent).toBe('No role');
  });

  it('updates user and role values', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      screen.getByText('Set User').click();
      screen.getByText('Set Role').click();
    });

    expect(screen.getByTestId('user').textContent).toBe('test@example.com');
    expect(screen.getByTestId('role').textContent).toBe('manager');
  });
});