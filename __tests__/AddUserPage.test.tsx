import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddUserPage from '../src/pages/AddUserPage';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/user-event';
import '@testing-library/jest-dom';
import { toast } from 'sonner';
import React from 'react';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

// Wrap component in a Router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('AddUserPage', () => {
  it('renders the AddUserPage with form elements', () => {
    renderWithRouter(<AddUserPage />);

    expect(screen.getByText(/Add New User/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload Photo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add User/i })).toBeDisabled();
  });

  it('enables the submit button when valid data is entered', async () => {
    renderWithRouter(<AddUserPage />);

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const fileInput = screen.getByLabelText(/Profile Photo/i);

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    fireEvent.change(fileInput, {
      target: {
        files: [new File(['photo'], 'profile.png', { type: 'image/png' })],
      },
    });

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Add User/i })).toBeEnabled()
    );
  });

  it('shows a success toast and adds user to local storage on form submission', async () => {
    renderWithRouter(<AddUserPage />);

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const fileInput = screen.getByLabelText(/Profile Photo/i);
    const submitButton = screen.getByRole('button', { name: /Add User/i });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    fireEvent.change(fileInput, {
      target: {
        files: [new File(['photo'], 'profile.png', { type: 'image/png' })],
      },
    });

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('User added successfully!');
    });

    const savedData = JSON.parse(localStorage.getItem('userData') || '[]');
    expect(savedData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Name: 'John Doe',
          Email: 'john@example.com',
        }),
      ])
    );
  });
});
