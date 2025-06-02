import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { BlogCard } from './BlogCard';

const mockBlogItem = {
  date: '01.06.2025',
  title: 'Новый пост в блоге',
  text: 'Это краткое описание блога.',
  image: '/test-image.jpg',
};

describe('BlogCard snapshot test', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <BlogCard {...mockBlogItem} index={3} />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

test('renders blog card content', () => {
  render(<BlogCard {...mockBlogItem} index={5} />, { wrapper: MemoryRouter });

  expect(screen.getByAltText(mockBlogItem.title)).toBeInTheDocument();
  expect(screen.getByText(mockBlogItem.date)).toBeInTheDocument();
  expect(screen.getByText(mockBlogItem.title)).toBeInTheDocument();
  expect(screen.getByText(mockBlogItem.text)).toBeInTheDocument();
});

test('blog card links to correct article', () => {
  render(<BlogCard {...mockBlogItem} index={7} />, { wrapper: MemoryRouter });

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/article/7');
});
