import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Breadcrumbs } from './Breadcrumbs';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Breadcrumbs', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders static breadcrumbs', () => {
    renderWithRouter(<Breadcrumbs />);
    expect(screen.getByText('MAIN')).toBeInTheDocument();
    expect(screen.getByText('CATALOG')).toBeInTheDocument();

    expect(screen.getAllByText('•').length).toBe(1);
  });

  test('renders dynamic breadcrumbs when category props are passed', () => {
    renderWithRouter(<Breadcrumbs category1="Motorcycles" category2="Sports Bikes" id1="id1" id2="id2" />);

    expect(screen.getByText('Motorcycles')).toBeInTheDocument();
    expect(screen.getByText('Sports Bikes')).toBeInTheDocument();

    expect(screen.getAllByText('•').length).toBe(3);
  });

  test('last breadcrumb has active class', () => {
    renderWithRouter(<Breadcrumbs category1="Motorcycles" category2="Sports Bikes" id1="id1" id2="id2" />);

    const lastCrumb = screen.getByText('Sports Bikes');
    expect(lastCrumb).toHaveClass('active');
  });

  test('clicking breadcrumb with id sets localStorage filter', () => {
    renderWithRouter(<Breadcrumbs category1="Motorcycles" id2="filter-id" />);

    const dynamicCrumb = screen.getByText('Motorcycles');
    fireEvent.click(dynamicCrumb);

    expect(localStorage.getItem('filter')).toBe('filter-id');
  });

  test('clicking /main breadcrumb removes filter from localStorage', () => {
    localStorage.setItem('filter', 'some-filter');
    renderWithRouter(<Breadcrumbs />);

    const mainCrumb = screen.getByText('MAIN');
    fireEvent.click(mainCrumb);

    expect(localStorage.getItem('filter')).toBeNull();
  });

  test('clicking /catalog breadcrumb without id removes filter', () => {
    localStorage.setItem('filter', 'some-filter');
    renderWithRouter(<Breadcrumbs />);

    const catalogCrumb = screen.getByText('CATALOG');
    fireEvent.click(catalogCrumb);

    expect(localStorage.getItem('filter')).toBeNull();
  });
});
