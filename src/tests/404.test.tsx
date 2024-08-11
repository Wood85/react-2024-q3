import { render, screen } from '@testing-library/react';
import NotFound from './../pages/404';
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

describe('NotFound', () => {
  test('renders the NotFound component', () => {
    render(<NotFound />);
    expect(screen.getByTestId('error-page')).toBeInTheDocument();
  });
});
