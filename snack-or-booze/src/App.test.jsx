import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './App';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

// Mock the entire Api module
vi.mock('./Api', () => ({
  default: {
    getSnacks: vi.fn(),
    getDrinks: vi.fn(),
    addSnack: vi.fn(),
    addDrink: vi.fn()
  }
}));

// Import the mocked Api module
import SnackOrBoozeApi from './Api';

describe('App Component', () => {
  const mockSnacks = [
    { id: 'nachos', name: 'Nachos', description: 'An American classic!' }
  ];
  const mockDrinks = [
    { id: 'martini', name: 'Martini', description: 'An ice-cold, refreshing classic.' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default mock responses
    SnackOrBoozeApi.getSnacks.mockResolvedValue(mockSnacks);
    SnackOrBoozeApi.getDrinks.mockResolvedValue(mockDrinks);
  });

  it('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading …')).toBeInTheDocument();
  });

  it('renders home page after loading', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Welcome to Silicon Valley\'s premier dive cafe!')).toBeInTheDocument();
    });

    expect(screen.getByText('We have 1 snacks and 1 drinks available.')).toBeInTheDocument();
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
      expect(screen.getByText(/drinks menu/)).toBeInTheDocument();
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
    SnackOrBoozeApi.getSnacks.mockRejectedValue(new Error('API Error'));
    SnackOrBoozeApi.getDrinks.mockRejectedValue(new Error('API Error'));

    // Mock console.error to avoid test output pollution
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Should still render something even with API errors
    await waitFor(() => {
      // The app should handle errors gracefully
      expect(screen.queryByText('Loading …')).not.toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});