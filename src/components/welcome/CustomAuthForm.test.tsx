import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomAuthForm from './CustomAuthForm';
import { AuthProvider } from '@/contexts/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { jest } from '@jest/globals';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/useAuth';
import { act } from 'react';

jest.mock('@/contexts/AuthContext', () => ({
  AuthProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('@/contexts/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockUseAuth = useAuth as jest.Mock;
mockUseAuth.mockReturnValue({
  signIn: jest.fn().mockImplementation(() => Promise.resolve()),
});

const mockToast = toast;

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
};

describe('CustomAuthForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Forgot password link', () => {
    renderWithProviders(<CustomAuthForm />);
    const forgotPasswordLink = screen.getByText(/Forgot password\?/i);
    expect(forgotPasswordLink).toBeInTheDocument();
  });

  it('submits the form with valid inputs', async () => {
    mockUseAuth.mockReturnValueOnce({
      signIn: jest.fn().mockResolvedValueOnce(undefined as never), // Mock successful login
    });

    renderWithProviders(<CustomAuthForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await act(async () => {
      await userEvent.click(submitButton);
    });

    expect(mockToast.success).toHaveBeenCalledWith('Signed in successfully');
  });

  it('shows an error message for invalid inputs', async () => {
    mockUseAuth.mockReturnValueOnce({
      signIn: jest.fn().mockRejectedValueOnce(new Error('Invalid email') as never), // Mock failed login
    });

    renderWithProviders(<CustomAuthForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'invalid-email');
    console.log('Mock signIn called with:', (emailInput as HTMLInputElement).value);
    await act(async () => {
      await userEvent.click(submitButton);
    });
    console.log('Mock signIn error:', new Error('Invalid email'));

    console.log('Mocked toast.error:', toast.error);
    expect(mockToast.error).toHaveBeenCalledWith('Invalid email');
    console.log('mockToast.error calls:', (mockToast.error as jest.Mock).mock.calls);
    console.log('mockToast.error calls during test:', (mockToast.error as jest.Mock).mock.calls);
  });
});