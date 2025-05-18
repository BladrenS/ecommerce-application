import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

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
