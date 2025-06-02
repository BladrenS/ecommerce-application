import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { Article } from './Article';

jest.mock('./articles', () => ({
  articleItems: [
    {
      header: 'Test Article 0',
      image: 'image0.jpg',
      text: 'Content for article zero',
    },
    {
      header: 'Test Article 1',
      image: 'image1.jpg',
      text: 'Content for article one',
    },
  ],
}));

describe('Article snapshot test', () => {
  it('renders article with id 0 correctly', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/article/0']}>
        <Routes>
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders article with id 1 correctly', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/article/1']}>
        <Routes>
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
