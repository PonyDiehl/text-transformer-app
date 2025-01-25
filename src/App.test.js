import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
import MatrixRain from './MatrixRain';

// Inside your App component's return statement
return (
  <div className="App">
    <MatrixRain />
    {/* rest of your components */}
  </div>
);