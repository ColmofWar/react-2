import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

/**
 * Tests for the App component.
 * Verifies initial loading behavior, routing, navigation,
 * and graceful handling of API errors.
 */

// Mock the Api module used by App
vi.mock('./Api', () => ({
  default: {
    getSnacks: vi.fn(),
    getDrinks: vi.fn(),
    addSnack: vi.fn(),
    addDrink: vi.fn()
  }
}));

import SnackOrBoozeApi from './Api';

describe('App Component', () => {
  // Mock data for snacks and drinks
  const mockSnacks = [
    { id: 'nachos', name: 'Nachos', description: 'An American classic!' }
  ];
  const mockDrinks = [
    { id: 'martini', name: 'Martini', description: 'An ice-cold, refreshing classic.' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Set up default successful API responses before each test
    SnackOrBoozeApi.getSnacks.mockResolvedValue(mockSnacks);
    SnackOrBoozeApi.getDrinks.mockResolvedValue(mockDrinks);
  });

  it('renders loading state initially', () => {
    // Test that the loading message is shown before data loads
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('renders Home page with correct snack and drink counts', async () => {
    // Test that the Home page displays the correct counts for snacks and drinks
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Welcome to Silicon Valley\'s premier dive cafe!')).toBeInTheDocument();
      expect(screen.getByText('We have 1 snacks and 1 drinks available.')).toBeInTheDocument();
    });
  });

  it('renders navigation bar', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Snack or Booze')).toBeInTheDocument();
    });

    expect(screen.getByText('Snacks')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });

  it('navigates to snacks menu', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Snacks')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Snacks'));

    await waitFor(() => {
      expect(screen.getByText(/snacks menu/i)).toBeInTheDocument();
      expect(screen.getByText('Nachos')).toBeInTheDocument();
    });
  });

  it('navigates to drinks menu', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Drinks')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Drinks'));

    await waitFor(() => {
      expect(screen.getByText(/drinks menu/i)).toBeInTheDocument();
      expect(screen.getByText('Martini')).toBeInTheDocument();
    });
  });

  it('navigates to add item page', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Add Item')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Add Item'));

    await waitFor(() => {
      expect(screen.getByText('Add New Item')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    // Test that the App handles API errors without crashing
    SnackOrBoozeApi.getSnacks.mockRejectedValue(new Error('API Error'));
    SnackOrBoozeApi.getDrinks.mockRejectedValue(new Error('API Error'));

    // Silence expected error logging during test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // App should still render and exit loading state
    await waitFor(() => {
      expect(screen.queryByText(/Loading/)).not.toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});
