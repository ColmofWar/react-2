import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

// Test setup helper
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Snack or Booze App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('API Integration', () => {
    it('fetches snacks successfully', async () => {
      const mockSnacks = [
        { id: 'nachos', name: 'Nachos', description: 'An American classic!' }
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockSnacks });

      const { default: SnackOrBoozeApi } = await import('./Api');
      const result = await SnackOrBoozeApi.getSnacks();

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5000/snacks');
      expect(result).toEqual(mockSnacks);
    });

    it('fetches drinks successfully', async () => {
      const mockDrinks = [
        { id: 'martini', name: 'Martini', description: 'An ice-cold, refreshing classic.' }
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockDrinks });

      const { default: SnackOrBoozeApi } = await import('./Api');
      const result = await SnackOrBoozeApi.getDrinks();

      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5000/drinks');
      expect(result).toEqual(mockDrinks);
    });

    it('adds a snack successfully', async () => {
      const newSnack = {
        id: 'chips',
        name: 'Chips',
        description: 'Crispy and delicious',
        recipe: 'Bake in oven',
        serve: 'With dip'
      };

      mockedAxios.post.mockResolvedValueOnce({ data: newSnack });

      const { default: SnackOrBoozeApi } = await import('./Api');
      const result = await SnackOrBoozeApi.addSnack(newSnack);

      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:5000/snacks', newSnack);
      expect(result).toEqual(newSnack);
    });

    it('adds a drink successfully', async () => {
      const newDrink = {
        id: 'soda',
        name: 'Soda',
        description: 'Refreshing beverage',
        recipe: 'Mix with water',
        serve: 'Chilled'
      };

      mockedAxios.post.mockResolvedValueOnce({ data: newDrink });

      const { default: SnackOrBoozeApi } = await import('./Api');
      const result = await SnackOrBoozeApi.addDrink(newDrink);

      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:5000/drinks', newDrink);
      expect(result).toEqual(newDrink);
    });
  });
});