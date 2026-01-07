import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AddItem from './AddItem';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

// Mock useHistory from react-router-dom
const mockHistoryPush = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useHistory: () => ({
      push: mockHistoryPush
    })
  };
});

// Mock the Api module
vi.mock('./Api', () => ({
  default: {
    addSnack: vi.fn(),
    addDrink: vi.fn()
  }
}));

// Test helper to render component with router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AddItem Component', () => {
  const mockRefreshData = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Form Rendering', () => {
    it('renders the add item form with all required fields', () => {
      renderWithRouter(<AddItem refreshData={mockRefreshData} />);

      // Check main heading
      expect(screen.getByText('Add New Item')).toBeInTheDocument();
      expect(screen.getByText('Add a new snack or drink to the menu.')).toBeInTheDocument();

      // Check form fields
      expect(screen.getByLabelText(/Type:/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Name:/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Description:/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Recipe:/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Serve:/)).toBeInTheDocument();

      // Check submit button
      expect(screen.getByRole('button', { name: /Add Item/ })).toBeInTheDocument();
    });

    it('defaults to snack type selection', () => {
      renderWithRouter(<AddItem refreshData={mockRefreshData} />);

      const typeSelect = screen.getByRole('combobox');
      expect(typeSelect).toHaveValue('snack');
      expect(typeSelect).toContainElement(screen.getByText('Snack'));
      expect(typeSelect).toContainElement(screen.getByText('Drink'));
    });

    it('has proper form structure and accessibility', () => {
      renderWithRouter(<AddItem refreshData={mockRefreshData} />);

      const form = screen.getByTestId('add-item-form');
      expect(form).toBeInTheDocument();

      // Check that required fields have proper attributes
      const requiredFields = ['name', 'description', 'recipe', 'serve'];
      requiredFields.forEach(fieldName => {
        const field = screen.getByLabelText(new RegExp(fieldName, 'i'));
        expect(field).toBeRequired();
      });
    });
  });

  describe('Form Interactions', () => {
    it('allows changing the item type', async () => {
      const user = userEvent.setup();
      renderWithRouter(<AddItem refreshData={mockRefreshData} />);

      const typeSelect = screen.getByLabelText(/Type:/);
      await user.selectOptions(typeSelect, 'drink');

      expect(typeSelect).toHaveValue('drink');
    });

    it('updates form data when typing in text fields', async () => {
      const user = userEvent.setup();
      renderWithRouter(<AddItem refreshData={mockRefreshData} />);

      const nameInput = screen.getByLabelText(/Name:/);
      const descriptionInput = screen.getByLabelText(/Description:/);
      const recipeInput = screen.getByLabelText(/Recipe:/);
      const serveInput = screen.getByLabelText(/Serve:/);

      await user.type(nameInput, 'Test Item');
      await user.type(descriptionInput, 'A delicious test item');
      await user.type(recipeInput, 'Mix ingredients');
      await user.type(serveInput, 'Serve hot');

      expect(nameInput).toHaveValue('Test Item');
      expect(descriptionInput).toHaveValue('A delicious test item');
      expect(recipeInput).toHaveValue('Mix ingredients');
      expect(serveInput).toHaveValue('Serve hot');
    });
  });

  describe('Form Submission - Snacks', () => {
    it('successfully submits a new snack and navigates to snacks page', async () => {
      const user = userEvent.setup();
      const { default: SnackOrBoozeApi } = await import('./Api');

      const snackData = {
        id: '',
        name: 'Test Snack',
        description: 'A test snack',
        recipe: 'Make it tasty',
        serve: 'With love'
      };

      SnackOrBoozeApi.addSnack.mockResolvedValueOnce(snackData);

      renderWithRouter(<AddItem refreshData={mockRefreshData} />);

      // Fill out the form
      await user.type(screen.getByLabelText(/Name:/), snackData.name);
      await user.type(screen.getByLabelText(/Description:/), snackData.description);
      await user.type(screen.getByLabelText(/Recipe:/), snackData.recipe);
      await user.type(screen.getByLabelText(/Serve:/), snackData.serve);

      // Submit the form
      await user.click(screen.getByRole('button', { name: /Add Item/ }));

      await waitFor(() => {
        expect(SnackOrBoozeApi.addSnack).toHaveBeenCalledWith(snackData);
        expect(mockRefreshData).toHaveBeenCalledTimes(1);
        expect(mockHistoryPush).toHaveBeenCalledWith('/snacks');
      });
    });

    it('handles snack submission errors gracefully', async () => {
      const user = userEvent.setup();
      const { default: SnackOrBoozeApi } = await import('./Api');
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      SnackOrBoozeApi.addSnack.mockRejectedValueOnce(new Error('API Error'));

      renderWithRouter(<AddItem refreshData={mockRefreshData} />);

      // Fill out minimal required fields
      await user.type(screen.getByLabelText(/Name:/), 'Test Snack');
      await user.type(screen.getByLabelText(/Description:/), 'Test description');
      await user.type(screen.getByLabelText(/Recipe:/), 'Test recipe');
      await user.type(screen.getByLabelText(/Serve:/), 'Test serve');

      await user.click(screen.getByRole('button', { name: /Add Item/ }));

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error adding item:', expect.any(Error));
        expect(mockRefreshData).not.toHaveBeenCalled();
        expect(mockHistoryPush).not.toHaveBeenCalled();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Form Submission - Drinks', () => {
    it('successfully submits a new drink and navigates to drinks page', async () => {
      const user = userEvent.setup();
      const { default: SnackOrBoozeApi } = await import('./Api');

      const drinkData = {
        id: '',
        name: 'Test Drink',
        description: 'A refreshing test drink',
        recipe: 'Mix well',
        serve: 'Chilled'
      };

      SnackOrBoozeApi.addDrink.mockResolvedValueOnce(drinkData);

      renderWithRouter(<AddItem refreshData={mockRefreshData} />);

      // Change type to drink
      const typeSelect = screen.getByLabelText(/Type:/);
      await user.selectOptions(typeSelect, 'drink');

      // Fill out the form
      await user.type(screen.getByLabelText(/Name:/), drinkData.name);
      await user.type(screen.getByLabelText(/Description:/), drinkData.description);
      await user.type(screen.getByLabelText(/Recipe:/), drinkData.recipe);
      await user.type(screen.getByLabelText(/Serve:/), drinkData.serve);

      // Submit the form
      await user.click(screen.getByRole('button', { name: /Add Item/ }));

      await waitFor(() => {
        expect(SnackOrBoozeApi.addDrink).toHaveBeenCalledWith(drinkData);
        expect(mockRefreshData).toHaveBeenCalledTimes(1);
        expect(mockHistoryPush).toHaveBeenCalledWith('/drinks');
      });
    });

    it('handles drink submission errors gracefully', async () => {
      const user = userEvent.setup();
      const { default: SnackOrBoozeApi } = await import('./Api');
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      SnackOrBoozeApi.addDrink.mockRejectedValueOnce(new Error('API Error'));

      renderWithRouter(<AddItem refreshData={mockRefreshData} />);

      // Change type to drink
      const typeSelect = screen.getByLabelText(/Type:/);
      await user.selectOptions(typeSelect, 'drink');

      // Fill out minimal required fields
      await user.type(screen.getByLabelText(/Name:/), 'Test Drink');
      await user.type(screen.getByLabelText(/Description:/), 'Test description');
      await user.type(screen.getByLabelText(/Recipe:/), 'Test recipe');
      await user.type(screen.getByLabelText(/Serve:/), 'Test serve');

      await user.click(screen.getByRole('button', { name: /Add Item/ }));

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Error adding item:', expect.any(Error));
        expect(mockRefreshData).not.toHaveBeenCalled();
        expect(mockHistoryPush).not.toHaveBeenCalled();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Form Validation', () => {
    it('prevents submission when required fields are empty', async () => {
      const user = userEvent.setup();
      renderWithRouter(<AddItem refreshData={mockRefreshData} />);

      const submitButton = screen.getByRole('button', { name: /Add Item/ });

      // Try to submit without filling any fields
      await user.click(submitButton);

      // Form should not submit (browser validation should prevent it)
      expect(mockRefreshData).not.toHaveBeenCalled();
      expect(mockHistoryPush).not.toHaveBeenCalled();
    });

    it('allows submission when all required fields are filled', async () => {
      const user = userEvent.setup();
      const { default: SnackOrBoozeApi } = await import('./Api');

      SnackOrBoozeApi.addSnack.mockResolvedValueOnce({});

      renderWithRouter(<AddItem refreshData={mockRefreshData} />);

      // Fill all required fields
      await user.type(screen.getByLabelText(/Name:/), 'Complete Item');
      await user.type(screen.getByLabelText(/Description:/), 'Complete description');
      await user.type(screen.getByLabelText(/Recipe:/), 'Complete recipe');
      await user.type(screen.getByLabelText(/Serve:/), 'Complete serve instructions');

      await user.click(screen.getByRole('button', { name: /Add Item/ }));

      await waitFor(() => {
        expect(SnackOrBoozeApi.addSnack).toHaveBeenCalled();
        expect(mockRefreshData).toHaveBeenCalled();
      });
    });
  });
});