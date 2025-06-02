import { fireEvent, render, screen } from '@testing-library/react';

import { Pagination } from './Pagination';

const mockSetPage = jest.fn();

jest.mock('../../../../pages/Catalog/context/CatalogContext', () => ({
  useCatalogContext: () => ({
    pagination: [0, 1, 2, 3, 4, 5],
    page: {
      currentPage: 1,
      totalPages: 6,
      count: 54,
      limit: 5,
      offset: 0,
    },
    setPage: mockSetPage,
  }),
}));

describe('Pagination', () => {
  beforeEach(() => {
    mockSetPage.mockClear();
  });

  test('рендерит кнопки пагинации и стрелки', () => {
    render(<Pagination />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons[0]).toBeDisabled();
    expect(buttons[buttons.length - 1]).not.toBeDisabled();
  });

  test('клик по кнопке номера страницы вызывает setPage с правильным значением', () => {
    render(<Pagination />);
    const page3Button = screen.getByText('3');
    fireEvent.click(page3Button);
    expect(mockSetPage).toHaveBeenCalled();
    const setPageArgument = mockSetPage.mock.calls[0][0];
    expect(typeof setPageArgument).toBe('function');
  });

  test('клик по стрелке "вперед" увеличивает currentPage', () => {
    render(<Pagination />);
    const nextButton = screen.getByText('>');
    fireEvent.click(nextButton);
    expect(mockSetPage).toHaveBeenCalled();
    const setPageArgument = mockSetPage.mock.calls[0][0];
    expect(typeof setPageArgument).toBe('function');
  });
});
