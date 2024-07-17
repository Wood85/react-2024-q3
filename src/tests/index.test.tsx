import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import React from 'react';
import ErrorBoundary from './../components/ErrorBoundary/ErrorBoundary';
import App from './../App';

describe('Root of the application', () => {
  it('renders the App component', () => {
    render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>,
    );

    expect(screen.getByTestId('app')).toBeInTheDocument();
  });
});
