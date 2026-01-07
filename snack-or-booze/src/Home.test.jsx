import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  it('renders welcome message', () => {
    const mockSnacks = [{ id: 'nachos', name: 'Nachos' }];
    const mockDrinks = [{ id: 'martini', name: 'Martini' }];

    render(<Home snacks={mockSnacks} drinks={mockDrinks} />);

    expect(screen.getByText('Welcome to Silicon Valley\'s premier dive cafe!')).toBeInTheDocument();
    expect(screen.getByText('We have 1 snacks and 1 drinks available.')).toBeInTheDocument();
  });

  it('displays correct counts', () => {
    const mockSnacks = [
      { id: 'nachos', name: 'Nachos' },
      { id: 'chips', name: 'Chips' }
    ];
    const mockDrinks = [
      { id: 'martini', name: 'Martini' },
      { id: 'beer', name: 'Beer' },
      { id: 'wine', name: 'Wine' }
    ];

    render(<Home snacks={mockSnacks} drinks={mockDrinks} />);

    expect(screen.getByText('We have 2 snacks and 3 drinks available.')).toBeInTheDocument();
  });

  it('handles empty arrays', () => {
    render(<Home snacks={[]} drinks={[]} />);

    expect(screen.getByText('We have 0 snacks and 0 drinks available.')).toBeInTheDocument();
  });
});