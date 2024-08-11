import { render, screen } from '@testing-library/react';
import ErrorPage from './../views/ErrorPage/ErrorPage';
import { describe, expect, test, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: () => null,
    };
  },
  useSearchParams() {
    return {
      get: () => null,
    };
  },
}));

describe('ErrorPage', () => {
  test('renders the ErrorPage component', () => {
    render(<ErrorPage />);
    expect(screen.getByTestId('error-page')).toBeInTheDocument();
  });
});
