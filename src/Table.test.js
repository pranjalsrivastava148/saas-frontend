import { render, screen } from '@testing-library/react';
import App from './App';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
      json: jest.fn().mockResolvedValueOnce([
        { id: 1, title: "Project 1" },
        { id: 2, title: "Project 2" },
        { id: 3, title: "Project 3" },
      ]),
  })
);

describe('Table with data', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders learn react link', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce([
        { id: 1, title: "Project 1" },
        { id: 2, title: "Project 2" },
        { id: 3, title: "Project 3" },
      ]),
    });

    const wrapper = render(<App />);
    screen.debug()
    const linkElement = screen.getByText(/loading.../i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toMatchSnapshot();
  });
})

