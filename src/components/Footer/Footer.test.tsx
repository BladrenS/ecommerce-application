import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { footerLinks, promoItems } from '../../constants/';
import { Footer } from './Footer';

describe('Footer snapshot test', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

test('renders promo items', () => {
  render(<Footer />, { wrapper: MemoryRouter });
  for (const [i, item] of promoItems.entries()) {
    expect(screen.getByAltText(`promo-${i}`)).toBeInTheDocument();
    expect(screen.getByText(item.text)).toBeInTheDocument();
  }
});

test('renders footer links', () => {
  render(<Footer />, { wrapper: MemoryRouter });
  for (const block of footerLinks) {
    expect(screen.getByText(block.header)).toBeInTheDocument();
    for (const link of block.links) {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    }
  }
});

test('footer links have correct hrefs and targets', () => {
  render(<Footer />, { wrapper: MemoryRouter });

  const mapLink = screen.getByText(/Николаева ул./i);
  expect(mapLink.closest('a')).toHaveAttribute('href', 'https://maps.app.goo.gl/1jSjmqpZzkUWpoZJ8');
  expect(mapLink.closest('a')).toHaveAttribute('target', '_blank');

  const mailLink = screen.getByText(/connect@хрустикshop.com/i);
  expect(mailLink.closest('a')).toHaveAttribute('href', 'mailto:connect@хрустикshop.com');

  const phoneLink = screen.getByText(/\+7 800 555 25 25/i);
  expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:+78005552525');
});
