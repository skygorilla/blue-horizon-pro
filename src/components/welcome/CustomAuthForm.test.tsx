
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomAuthForm from './CustomAuthForm';

// Mock the AuthContext
const mockSignIn = jest.fn();
const mockSignUp = jest.fn();

jest.mock('@/contexts/useAuth', () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    signUp: mockSignUp,
    isLoading: false,
  }),
}));

describe('CustomAuthForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form by default', () => {
    render(<CustomAuthForm />);
    
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  it('toggles to signup form', () => {
    render(<CustomAuthForm />);
    
    fireEvent.click(screen.getByText('Sign up'));
    
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
  });

  it('submits login form', async () => {
    mockSignIn.mockResolvedValueOnce({ data: {}, error: null });
    
    render(<CustomAuthForm />);
    
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });
});
