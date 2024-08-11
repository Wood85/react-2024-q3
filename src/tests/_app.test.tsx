import { render, screen, waitFor } from '@testing-library/react';
import App from './../pages/_app';
import { describe, expect, test } from 'vitest';
import { Router } from 'next/router';

describe('App', () => {
  test('_app.tsx test', () => {
    render(<App Component={() => <div>Test</div>} pageProps={{}} router={{} as Router} />);

    waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });
});
