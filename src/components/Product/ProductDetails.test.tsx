import { render, screen } from '@testing-library/react';

import * as utilities from '../../utils/centToDollar';
import { ProductDetails } from './ProductDetails';

jest.mock('../../components/Header/parts', () => ({
  FavoriteIcon: (props: any) => <svg data-testid="favorite-icon" {...props} />,
}));

jest.mock('../../components/Ui', () => ({
  Button: (props: any) => <button {...props} />,
}));

describe('ProductDetails', () => {
  beforeEach(() => {
    jest
      .spyOn(utilities, 'centToDollar')
      .mockImplementation((cents) => (cents === undefined ? '' : `$${(cents / 100).toFixed(2)}`));
  });

  test('renders product name and description', () => {
    render(<ProductDetails name="Test Product" description="This is a test product." />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product.')).toBeInTheDocument();
  });

  test('renders price and discountedPrice correctly with proper classes', () => {
    render(<ProductDetails name="Test" price={5000} discountedPrice={4000} />);

    expect(utilities.centToDollar).toHaveBeenCalledWith(5000);
    expect(utilities.centToDollar).toHaveBeenCalledWith(4000);

    const salePrice = screen.getByText('$50.00');
    expect(salePrice).toBeInTheDocument();
    expect(salePrice).toHaveClass('sale');

    const discountedPrice = screen.getByText('$40.00');
    expect(discountedPrice).toBeInTheDocument();
    expect(discountedPrice).toHaveClass('price');
  });

  test('renders only price if discountedPrice is not provided', () => {
    const { container } = render(<ProductDetails price={10} discountedPrice={undefined} name="Test Product" />);
    const priceElement = container.querySelector('.standard');
    expect(priceElement).toBeInTheDocument();
    expect(screen.getByText(/\$\d+/)).toBeInTheDocument();
  });

  test('renders Add to cart button and FavoriteIcon', () => {
    render(<ProductDetails name="Test" />);
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    expect(screen.getByTestId('favorite-icon')).toBeInTheDocument();
  });

  test('renders categories with delimiter', () => {
    render(<ProductDetails name="Test" category1="Category One" category2="Category Two" />);
    expect(screen.getByText((content) => content.includes('Category One'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Category Two'))).toBeInTheDocument();
    expect(screen.getByText('•')).toBeInTheDocument();
  });
});
