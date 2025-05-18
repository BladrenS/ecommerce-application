import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { LoginForm } from './LoginForm';

jest.mock('./logic/useLoginSubmitting', () => ({
  useLoginSubmitting: () => ({
    submit: jest.fn(),
    register: () => ({
      name: 'email',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    }),
    isValid: true,
    loading: false,
    errors: {},
  }),
}));

describe('LoginForm', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
