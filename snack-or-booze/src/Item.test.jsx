import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ItemDetail from './Item';

// Mock useParams
const mockUseParams = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => mockUseParams(),
  };
});

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ItemDetail Component', () => {
  it('renders item details correctly', () => {
    // Test that the component displays all details for a valid item
    mockUseParams.mockReturnValue({ id: 'nachos' });
    const mockItems = [{
      id: 'nachos',
      name: 'Nachos',
      description: 'An American classic!',
      recipe: 'Cover expensive, organic tortilla chips with Cheez Whiz.',
      serve: 'Serve in a hand-thrown ceramic bowl, garnished with canned black olives'
    }];

    renderWithRouter(<ItemDetail items={mockItems} cantFind="/snacks" />);

    expect(screen.getByText('Nachos')).toBeInTheDocument();
    expect(screen.getByText('An American classic!')).toBeInTheDocument();
    expect(screen.getByText(/Cover expensive/)).toBeInTheDocument();
    expect(screen.getByText(/Serve in a hand-thrown/)).toBeInTheDocument();
  });

  it('displays recipe and serve labels', () => {
    // Test that the component shows the "Recipe:" and "Serve:" labels for an item
    mockUseParams.mockReturnValue({ id: 'test' });
    const mockItems = [{
      id: 'test',
      name: 'Test Item',
      description: 'Test description',
      recipe: 'Test recipe',
      serve: 'Test serve'
    }];

    renderWithRouter(<ItemDetail items={mockItems} cantFind="/snacks" />);

    expect(screen.getByText(/Recipe:/)).toBeInTheDocument();
    expect(screen.getByText(/Serve:/)).toBeInTheDocument();
  });
});