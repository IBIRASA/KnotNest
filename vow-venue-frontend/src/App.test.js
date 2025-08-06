import { render, screen } from '@testing-library/react';
import App from './App';
test('renders welcome message', () => {
  render(<App />);
  const text = screen.getByText(/plan your dream wedding effortlessly/i);
  expect(text).toBeInTheDocument();
});
