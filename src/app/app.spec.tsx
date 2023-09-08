import { render } from '@testing-library/react';
import App from './app';

vi.mock('../features/place-autocomplete/place-autocomplete');

describe('App', () => {
  it('should render successfully', () => {
    render(<App />);
  });
});
