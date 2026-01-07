import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('NavBar Component', () => {
  it('renders brand link', () => {
    renderWithRouter(<NavBar />);

    const brandLink = screen.getByText('Snack or Booze');
    expect(brandLink).toBeInTheDocument();
    expect(brandLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders all navigation links', () => {
    renderWithRouter(<NavBar />);

    expect(screen.getByText('Snacks')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });

  it('has correct navigation link hrefs', () => {
    renderWithRouter(<NavBar />);

    expect(screen.getByText('Snacks').closest('a')).toHaveAttribute('href', '/snacks');
    expect(screen.getByText('Drinks').closest('a')).toHaveAttribute('href', '/drinks');
    expect(screen.getByText('Add Item').closest('a')).toHaveAttribute('href', '/add');
  });

  it('renders navigation structure', () => {
    renderWithRouter(<NavBar />);

    // Check that we have a navbar element
    const navbar = document.querySelector('.navbar');
    expect(navbar).toBeInTheDocument();

    // Check that navigation items are in a nav element
    const nav = document.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });
});