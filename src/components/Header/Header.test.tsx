import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Header } from './Header';

describe('Header snapshot test', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
