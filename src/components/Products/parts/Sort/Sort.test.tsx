import { render, screen } from '@testing-library/react';

import { Sort } from './Sort';

jest.mock('../../../../pages/Catalog', () => ({
  useCatalogContext: () => ({
    filters: {
      sort: { value: 'default', direction: 'asc' },
    },
    setFilters: jest.fn(),
  }),
}));

describe('Sort snapshot', () => {
  it('соответствует снапшоту', () => {
    const { asFragment } = render(<Sort />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Sort', () => {
  test('рендерит все варианты сортировки', () => {
    render(<Sort />);
    expect(screen.getByText('Sorting:')).toBeInTheDocument();
    expect(screen.getByText('default')).toBeInTheDocument();
    expect(screen.getByText('price')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
  });
});
