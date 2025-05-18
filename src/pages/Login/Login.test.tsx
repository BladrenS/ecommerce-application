import { render, screen } from '@testing-library/react';

import { Login } from './Login';

jest.mock('../../components', () => ({
  LoginForm: () => <div data-testid="login-form" />,
}));

const navigateMock = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

describe('Login component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should navigate to /main if refresh_token exists in localStorage', () => {
    localStorage.setItem('refresh_token', 'token');
    render(<Login />);
    expect(navigateMock).toHaveBeenCalledWith('/main');
  });

  it('should render LoginForm if no refresh_token in localStorage', () => {
    render(<Login />);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });
});
