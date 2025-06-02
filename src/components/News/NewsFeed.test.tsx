import { render, waitFor } from '@testing-library/react';
import axios from 'axios';

import { NewsFeed } from './NewsFeed';

jest.mock('axios');

const mockedAxiosGet = jest.mocked(axios.get, { shallow: true });

describe('NewsFeed', () => {
  it('renders loading and then news items', async () => {
    mockedAxiosGet.mockResolvedValueOnce({
      data: {
        articles: [
          {
            title: 'Test Title',
            description: 'Test Description',
            url: 'https://example.com',
            urlToImage: 'https://example.com/image.jpg',
          },
        ],
      },
    });

    const { getByText, container } = render(<NewsFeed />);

    expect(container.querySelector('div')).toBeInTheDocument();

    await waitFor(() => expect(getByText('Test Title')).toBeInTheDocument());

    expect(container).toMatchSnapshot();
  });
});
