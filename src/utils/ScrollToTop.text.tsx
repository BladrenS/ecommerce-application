import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ScrollToTop } from './ScrollToTop';

describe('ScrollToTop', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('вызывает window.scrollTo при изменении пути', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/page1']}>
        <ScrollToTop />
        <Routes>
          <Route path="/page1" element={<div>Page 1</div>} />
          <Route path="/page2" element={<div>Page 2</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });

    jest.clearAllMocks();

    rerender(
      <MemoryRouter initialEntries={['/page2']}>
        <ScrollToTop />
        <Routes>
          <Route path="/page1" element={<div>Page 1</div>} />
          <Route path="/page2" element={<div>Page 2</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
