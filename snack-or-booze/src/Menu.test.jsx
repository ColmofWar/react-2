import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MenuList from './Menu';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('MenuList Component', () => {
  it('renders snacks menu correctly', () => {
    // Test that the snacks menu displays all snack items and the correct title
    const mockSnacks = [
      { id: 'nachos', name: 'Nachos' },
      { id: 'chips', name: 'Chips' }
    ];

    renderWithRouter(<MenuList items={mockSnacks} title="Snacks" type="snacks" />);

    expect(screen.getByText('Snacks')).toBeInTheDocument();
    expect(screen.getByText('Nachos')).toBeInTheDocument();
    expect(screen.getByText('Chips')).toBeInTheDocument();
  });

  it('renders drinks menu correctly', () => {
    // Test that the drinks menu displays all drink items and the correct title
    const mockDrinks = [
      { id: 'martini', name: 'Martini' },
      { id: 'beer', name: 'Beer' }
    ];

    renderWithRouter(<MenuList items={mockDrinks} title="Drinks" type="drinks" />);

    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.getByText('Martini')).toBeInTheDocument();
    expect(screen.getByText('Beer')).toBeInTheDocument();
  });

  it('generates correct links', () => {
    // Test that the menu item links are generated with the correct URLs
    const mockSnacks = [{ id: 'nachos', name: 'Nachos' }];

    renderWithRouter(<MenuList items={mockSnacks} title="Snacks" type="snacks" />);

    const link = screen.getByRole('link', { name: 'Nachos' });
    expect(link).toHaveAttribute('href', '/snacks/nachos');
  });

  it('handles empty items array', () => {
    // Test the component's behavior when the items array is empty
    renderWithRouter(<MenuList items={[]} title="Empty Menu" type="snacks" />);

    expect(screen.getByText('Empty Menu')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});