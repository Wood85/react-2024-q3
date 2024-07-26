import { render, screen, waitFor } from '@testing-library/react';
import ErrorBoundary from './../components/ErrorBoundary/ErrorBoundary';
import App from './../App';

describe('ErrorPage', () => {
  test('renders the ErrorPage component', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => null);
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>,
    );
    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeVisible();
    });
  });
});
