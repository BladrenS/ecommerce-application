import { fireEvent, render, screen } from '@testing-library/react';

import { Category } from './Category';
import styles from './styles.module.scss';

describe('Category component', () => {
  test('renders with given name', () => {
    render(<Category name="Test Category" checked={false} onClick={() => {}} />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  test('has active class when checked is true', () => {
    render(<Category name="Active Cat" checked={true} onClick={() => {}} />);
    const li = screen.getByText('Active Cat');
    expect(li).toHaveClass(styles.category);
    expect(li).toHaveClass(styles.active);
  });

  test('does not have active class when checked is false', () => {
    render(<Category name="Inactive Cat" checked={false} onClick={() => {}} />);
    const li = screen.getByText('Inactive Cat');
    expect(li).toHaveClass(styles.category);
    expect(li).not.toHaveClass(styles.active);
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Category name="Clickable Cat" checked={false} onClick={handleClick} />);
    const li = screen.getByText('Clickable Cat');
    fireEvent.click(li);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
