import { fireEvent, render, screen } from '@testing-library/react';

const mockChangeValue = jest.fn();

jest.mock('./logic/usePrice', () => ({
  usePrice: () => ({
    from: '10',
    to: '50',
    min: '0',
    max: '100',
    changeValue: mockChangeValue,
  }),
}));

import { Price } from './Price';

describe('Price component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls changeValue on input change', () => {
    render(<Price />);

    const fromInput = screen.getByPlaceholderText('0');
    fireEvent.change(fromInput, { target: { value: '20' } });

    expect(mockChangeValue).toHaveBeenCalledTimes(1);

    const toInput = screen.getByPlaceholderText('100');
    fireEvent.change(toInput, { target: { value: '60' } });

    expect(mockChangeValue).toHaveBeenCalledTimes(2);
  });
});
