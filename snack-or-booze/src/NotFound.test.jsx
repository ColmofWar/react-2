import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('NotFound Component', () => {
  it('renders 404 message', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Oops! Page Not Found')).toBeInTheDocument();
  });

  it('displays explanatory text', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByText('The page you\'re looking for doesn\'t exist. It might have been moved, deleted, or you entered the wrong URL.')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByRole('button', { name: 'Go Home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Browse Snacks' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Browse Drinks' })).toBeInTheDocument();
  });

  it('has correct navigation links', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByText('Go Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Browse Snacks').closest('a')).toHaveAttribute('href', '/snacks');
    expect(screen.getByText('Browse Drinks').closest('a')).toHaveAttribute('href', '/drinks');
  });

  it('renders in a card layout', () => {
    renderWithRouter(<NotFound />);

    const card = document.querySelector('.card');
    expect(card).toBeInTheDocument();

    const cardBody = document.querySelector('.card-body');
    expect(cardBody).toBeInTheDocument();
  });
});